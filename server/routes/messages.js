import express from 'express';
import { auth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { sendEmail, emailTemplates } from '../services/email.js';

const router = express.Router();

// Get all messages with a specific user
router.get('/:userId', auth, (req, res) => {
  const { userId } = req.params;
  
  db.all(
    `SELECT m.*, 
            s.name as sender_name, 
            r.name as receiver_name
     FROM messages m
     JOIN users s ON m.sender_id = s.id
     JOIN users r ON m.receiver_id = r.id
     WHERE (m.sender_id = ? AND m.receiver_id = ?)
        OR (m.sender_id = ? AND m.receiver_id = ?)
     ORDER BY m.created_at ASC`,
    [req.user.userId, userId, userId, req.user.userId],
    (err, messages) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch messages' });
      }
      res.json(messages);
    }
  );
});

// Get all contacts with latest message
router.get('/contacts', auth, (req, res) => {
  db.all(
    `WITH LastMessages AS (
      SELECT 
        CASE 
          WHEN sender_id = ? THEN receiver_id
          ELSE sender_id
        END as contact_id,
        MAX(created_at) as last_message_time
      FROM messages
      WHERE sender_id = ? OR receiver_id = ?
      GROUP BY contact_id
    )
    SELECT 
      u.id,
      u.name,
      u.role,
      m.content as last_message_content,
      m.created_at as last_message_time,
      COUNT(CASE WHEN m2.read = 0 AND m2.receiver_id = ? THEN 1 END) as unread_count
    FROM LastMessages lm
    JOIN users u ON u.id = lm.contact_id
    LEFT JOIN messages m ON (
      (m.sender_id = ? AND m.receiver_id = u.id) OR
      (m.sender_id = u.id AND m.receiver_id = ?)
    ) AND m.created_at = lm.last_message_time
    LEFT JOIN messages m2 ON m2.sender_id = u.id AND m2.receiver_id = ? AND m2.read = 0
    GROUP BY u.id
    ORDER BY lm.last_message_time DESC`,
    [req.user.userId, req.user.userId, req.user.userId, req.user.userId, req.user.userId, req.user.userId, req.user.userId],
    (err, contacts) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch contacts' });
      }
      res.json(contacts);
    }
  );
});

// Send a message
router.post('/',
  auth,
  [
    body('content').trim().notEmpty(),
    body('receiverId').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, receiverId, jobId } = req.body;
    const messageId = uuidv4();

    try {
      // Get receiver details for notification
      const receiver = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [receiverId], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });

      // Get job details if jobId is provided
      let job;
      if (jobId) {
        job = await new Promise((resolve, reject) => {
          db.get('SELECT * FROM jobs WHERE id = ?', [jobId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        });
      }

      // Insert message
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO messages (id, content, sender_id, receiver_id, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
          [messageId, content, req.user.userId, receiverId],
          (err) => err ? reject(err) : resolve()
        );
      });

      // Send email notification
      if (job) {
        await sendEmail(
          receiver.email,
          emailTemplates.newMessage(receiver.name, job.title).subject,
          emailTemplates.newMessage(receiver.name, job.title).html
        );
      }

      // Get the created message with sender/receiver names
      db.get(
        `SELECT m.*, 
                s.name as sender_name, 
                r.name as receiver_name
         FROM messages m
         JOIN users s ON m.sender_id = s.id
         JOIN users r ON m.receiver_id = r.id
         WHERE m.id = ?`,
        [messageId],
        (err, message) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch created message' });
          }
          res.status(201).json(message);
        }
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
});

// Mark messages as read
router.put('/read/:senderId', auth, (req, res) => {
  db.run(
    'UPDATE messages SET read = 1 WHERE sender_id = ? AND receiver_id = ? AND read = 0',
    [req.params.senderId, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to mark messages as read' });
      }
      res.json({ updated: this.changes });
    }
  );
});

export { router as messageRoutes };