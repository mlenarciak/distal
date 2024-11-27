import express from 'express';
import { auth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';

const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {
  db.all(`
    SELECT j.*, u.name as user_name, u.email as user_email 
    FROM jobs j 
    JOIN users u ON j.client_id = u.id
  `, [], (err, jobs) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch jobs' });
    }
    res.json(jobs);
  });
});

// Create job
router.post('/',
  auth,
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('budget').isFloat({ min: 0 }),
    body('location').trim().notEmpty(),
    body('requirements').trim().notEmpty(),
    body('delivery_format').trim().notEmpty(),
    body('timeline').trim().notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, budget, location, requirements, delivery_format, timeline } = req.body;
    const id = uuidv4();
    
    db.run(
      `INSERT INTO jobs (
        id, title, description, budget, location, requirements, 
        delivery_format, timeline, client_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, description, budget, location, requirements, delivery_format, timeline, req.user.userId, 'discussion'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create job' });
        }
        
        db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, job) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch created job' });
          }
          res.status(201).json(job);
        });
      }
    );
});

// Update job
router.put('/:id',
  auth,
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('budget').isFloat({ min: 0 }),
    body('location').trim().notEmpty(),
    body('requirements').trim().notEmpty(),
    body('delivery_format').trim().notEmpty(),
    body('timeline').trim().notEmpty(),
    body('status').isIn(['discussion', 'quoted', 'accepted', 'in_progress', 'review', 'completed', 'cancelled'])
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, budget, location, requirements, delivery_format, timeline, status } = req.body;
    
    db.run(
      `UPDATE jobs 
       SET title = ?, description = ?, budget = ?, location = ?, 
           requirements = ?, delivery_format = ?, timeline = ?, 
           status = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND client_id = ?`,
      [title, description, budget, location, requirements, delivery_format, timeline, status, req.params.id, req.user.userId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update job' });
        }
        
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Job not found or unauthorized' });
        }
        
        db.get('SELECT * FROM jobs WHERE id = ?', [req.params.id], (err, job) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch updated job' });
          }
          res.json(job);
        });
      }
    );
});

// Delete job
router.delete('/:id', auth, (req, res) => {
  db.run(
    'DELETE FROM jobs WHERE id = ? AND client_id = ?',
    [req.params.id, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete job' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Job not found or unauthorized' });
      }
      
      res.json({ message: 'Job deleted' });
    }
  );
});

export { router };