// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// In-memory "database" for users (replace this with MongoDB in production)
let users = [
  { email: 'test1@outlook.com', password: bcrypt.hashSync('test', 10) }, // Predefined user
];

// Logowanie użytkownika
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password }); // Debug log

  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('users');

    // Sprawdzamy, czy użytkownik istnieje
    const user = await collection.findOne({ email });
    console.log('User found in database:', user); // Debug log

    if (!user) {
      console.log('User not found'); // Debug log
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sprawdzamy, czy hasło jest poprawne
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log('Is password valid:', isPasswordValid); // Debug log

    if (!isPasswordValid) {
      console.log('Invalid password'); // Debug log
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generowanie tokena JWT
    const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

// Rejestracja użytkownika
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Sprawdzamy, czy użytkownik już istnieje
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Tworzymy nowego użytkownika
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully' });
});

module.exports = router;