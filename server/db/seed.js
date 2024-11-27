import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from './index.js';

const seedData = async () => {
  try {
    // Create tables if they don't exist
    await new Promise((resolve, reject) => {
      db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        rating INTEGER,
        comment TEXT,
        user_id TEXT,
        provider_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (provider_id) REFERENCES users (id)
      )`, (err) => err ? reject(err) : resolve());
    });

    await new Promise((resolve, reject) => {
      db.run(`CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        content TEXT,
        sender_id TEXT,
        receiver_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        read BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (sender_id) REFERENCES users (id),
        FOREIGN KEY (receiver_id) REFERENCES users (id)
      )`, (err) => err ? reject(err) : resolve());
    });

    // Sample users with different roles
    const users = [
      {
        id: uuidv4(),
        email: 'sarah.chen@example.com',
        password: await bcrypt.hash('secure123', 10),
        name: 'Dr. Sarah Chen',
        role: 'provider',
        specialty: 'Historical Manuscripts',
        bio: 'Expert in digitizing ancient texts'
      },
      {
        id: uuidv4(),
        email: 'james.wilson@example.com',
        password: await bcrypt.hash('secure123', 10),
        name: 'Prof. James Wilson',
        role: 'provider',
        specialty: 'Government Records',
        bio: 'Specialized in preserving government archives'
      },
      {
        id: uuidv4(),
        email: 'client@research.org',
        password: await bcrypt.hash('client123', 10),
        name: 'Research Institute',
        role: 'client',
        bio: 'Academic research organization'
      }
    ];

    // Sample datasets
    const datasets = [
      {
        id: uuidv4(),
        title: 'Medieval Manuscripts Collection',
        description: 'Digitized collection of 12th century manuscripts',
        price: 299.99,
        format: 'PDF, CSV',
        size: '2.3GB',
        preview_url: 'https://example.com/preview/medieval',
        provider_id: users[0].id
      },
      {
        id: uuidv4(),
        title: 'Census Records 1900-1950',
        description: 'Comprehensive census data from major cities',
        price: 199.99,
        format: 'CSV, JSON',
        size: '1.8GB',
        preview_url: 'https://example.com/preview/census',
        provider_id: users[1].id
      }
    ];

    // Sample jobs
    const jobs = [
      {
        id: uuidv4(),
        title: 'Digitize University Archives',
        description: 'Need help digitizing 1000+ academic papers',
        budget: 5000.00,
        location: 'Remote',
        status: 'open',
        client_id: users[2].id
      },
      {
        id: uuidv4(),
        title: 'Historical Weather Data Entry',
        description: 'Convert handwritten weather records to digital format',
        budget: 3000.00,
        location: 'New York, USA',
        status: 'open',
        client_id: users[2].id
      }
    ];

    // Insert users
    for (const user of users) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT OR IGNORE INTO users (id, email, password, name, role, specialty, bio) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [user.id, user.email, user.password, user.name, user.role, user.specialty, user.bio],
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    // Insert datasets
    for (const dataset of datasets) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT OR IGNORE INTO datasets (id, title, description, price, format, size, preview_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [dataset.id, dataset.title, dataset.description, dataset.price, dataset.format, dataset.size, dataset.preview_url, dataset.provider_id],
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    // Insert jobs
    for (const job of jobs) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT OR IGNORE INTO jobs (id, title, description, budget, location, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [job.id, job.title, job.description, job.budget, job.location, job.status, job.client_id],
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();