import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'support@distal.dev',
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

export const emailTemplates = {
  newMessage: (userName, jobTitle) => ({
    subject: `New message regarding "${jobTitle}"`,
    html: `
      <h2>Hello ${userName},</h2>
      <p>You have received a new message regarding the job "${jobTitle}".</p>
      <p>Please log in to your account to view and respond to the message.</p>
    `
  }),

  disputeRaised: (userName, jobTitle) => ({
    subject: `Dispute raised for "${jobTitle}"`,
    html: `
      <h2>Hello ${userName},</h2>
      <p>A dispute has been raised for the job "${jobTitle}".</p>
      <p>Our support team has been notified and will review the case.</p>
      <p>You will be contacted shortly for additional information if needed.</p>
    `
  }),

  paymentReceived: (userName, amount, jobTitle) => ({
    subject: `Payment received for "${jobTitle}"`,
    html: `
      <h2>Hello ${userName},</h2>
      <p>A payment of $${amount} has been received for the job "${jobTitle}".</p>
      <p>The funds will be held in escrow until the milestone is completed and approved.</p>
    `
  }),

  milestoneCompleted: (userName, jobTitle, milestoneName) => ({
    subject: `Milestone completed for "${jobTitle}"`,
    html: `
      <h2>Hello ${userName},</h2>
      <p>The milestone "${milestoneName}" for job "${jobTitle}" has been marked as complete.</p>
      <p>Please review the deliverables and provide your feedback.</p>
    `
  })
};