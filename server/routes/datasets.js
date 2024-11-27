import express from 'express';
import { auth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';

const router = express.Router();

// Get all datasets
router.get('/', (req, res) => {
  db.all(`
    SELECT d.*, u.name as user_name, u.email as user_email 
    FROM datasets d 
    JOIN users u ON d.user_id = u.id
  `, [], (err, datasets) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch datasets' });
    }
    res.json(datasets);
  });
});

// Create dataset
router.post('/',
  auth,
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('price').isFloat({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price } = req.body;
    const id = uuidv4();
    
    db.run(
      'INSERT INTO datasets (id, title, description, price, user_id) VALUES (?, ?, ?, ?, ?)',
      [id, title, description, price, req.user.userId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create dataset' });
        }
        
        db.get('SELECT * FROM datasets WHERE id = ?', [id], (err, dataset) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch created dataset' });
          }
          res.status(201).json(dataset);
        });
      }
    );
});

// Update dataset
router.put('/:id',
  auth,
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('price').isFloat({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price } = req.body;
    
    db.run(
      `UPDATE datasets 
       SET title = ?, description = ?, price = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND user_id = ?`,
      [title, description, price, req.params.id, req.user.userId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update dataset' });
        }
        
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Dataset not found or unauthorized' });
        }
        
        db.get('SELECT * FROM datasets WHERE id = ?', [req.params.id], (err, dataset) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch updated dataset' });
          }
          res.json(dataset);
        });
      }
    );
});

// Delete dataset
router.delete('/:id', auth, (req, res) => {
  db.run(
    'DELETE FROM datasets WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete dataset' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Dataset not found or unauthorized' });
      }
      
      res.json({ message: 'Dataset deleted' });
    }
  );
});

export { router };