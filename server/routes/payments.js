import express from 'express';
import { auth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { db } from '../db/index.js';
import { sendEmail, emailTemplates } from '../services/email.js';

export const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// Create payment for job/milestone
router.post('/',
  auth,
  [
    body('jobId').notEmpty(),
    body('milestoneId').optional(),
    body('amount').isFloat({ min: 0 }),
    body('paymentMethod').isIn(['stripe', 'paypal', 'external'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId, milestoneId, amount, paymentMethod } = req.body;
    const paymentId = uuidv4();

    try {
      // Get job details for notifications
      const job = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM jobs WHERE id = ?', [jobId], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });

      // Create payment record
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO payments (id, job_id, milestone_id, amount, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
          [paymentId, jobId, milestoneId, amount, paymentMethod, 'pending'],
          (err) => err ? reject(err) : resolve()
        );
      });

      // Handle different payment methods
      let paymentReference;
      if (paymentMethod === 'stripe' && stripe) {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Payment for Job: ${job.title}`,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          }],
          mode: 'payment',
          success_url: `${process.env.FRONTEND_URL}/jobs/${jobId}/payment-success`,
          cancel_url: `${process.env.FRONTEND_URL}/jobs/${jobId}/payment-cancel`,
        });
        paymentReference = session.id;
      }

      // Update payment record with reference
      if (paymentReference) {
        await new Promise((resolve, reject) => {
          db.run(
            'UPDATE payments SET payment_reference = ? WHERE id = ?',
            [paymentReference, paymentId],
            (err) => err ? reject(err) : resolve()
          );
        });
      }

      // Send notification emails
      const provider = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [job.provider_id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });

      await sendEmail(
        provider.email,
        emailTemplates.paymentReceived(provider.name, amount, job.title).subject,
        emailTemplates.paymentReceived(provider.name, amount, job.title).html
      );

      res.json({
        paymentId,
        stripeSessionId: paymentReference,
        status: 'pending'
      });
    } catch (error) {
      console.error('Payment creation failed:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  }
);

// Handle Stripe webhook
router.post('/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Update payment status
    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE payments SET status = ? WHERE payment_reference = ?',
        ['completed', session.id],
        (err) => err ? reject(err) : resolve()
      );
    });
  }

  res.json({ received: true });
});