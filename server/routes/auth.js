import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';

export const router = express.Router();

router.post('/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').trim().notEmpty().withMessage('Name is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const { email, password, name } = req.body;
      
      db.get('SELECT id FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Server error during user check' });
        }
        
        if (user) {
          return res.status(400).json({ error: 'User already exists' });
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const userId = uuidv4();
          
          db.run(
            'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
            [userId, email, hashedPassword, name],
            (err) => {
              if (err) {
                console.error('Database error during insertion:', err);
                return res.status(500).json({ error: 'Server error during registration' });
              }

              const token = jwt.sign(
                { userId },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
              );

              res.status(201).json({
                token,
                user: { id: userId, email, name }
              });
            }
          );
        } catch (hashError) {
          console.error('Hashing error:', hashError);
          return res.status(500).json({ error: 'Server error during password processing' });
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const { email, password } = req.body;
      
      db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Server error during login' });
        }

        if (!user) {
          return res.status(400).json({ error: 'Invalid credentials' });
        }

        try {
          const isMatch = await bcrypt.compare(password, user.password);
          
          if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
          }

          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );

          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          });
        } catch (compareError) {
          console.error('Password comparison error:', compareError);
          return res.status(500).json({ error: 'Server error during authentication' });
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
});