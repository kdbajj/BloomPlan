const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDb } = require("../db");

const router = express.Router();

// Logowanie użytkownika
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const collection = db.collection("users");

    // Sprawdzamy, czy użytkownik istnieje
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Sprawdzamy, czy hasło jest poprawne
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generowanie tokena JWT
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email }, // Dodaj userId do tokena
      "secretkey",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Rejestracja użytkownika
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const collection = db.collection("users");

    // Sprawdzamy, czy użytkownik już istnieje
    const userExists = await collection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Tworzymy nowego użytkownika
    const hashedPassword = bcrypt.hashSync(password, 10);
    await collection.insertOne({ email, password: hashedPassword });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
