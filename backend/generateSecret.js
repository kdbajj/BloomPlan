const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; // Użyj klucza z pliku .env

// Przykład tworzenia tokena
const token = jwt.sign({ userId: user._id }, secretKey);
