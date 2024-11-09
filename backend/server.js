require('dotenv').config(); // Upewnij się, że jest na samej górze pliku

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());

// Połączenie z MongoDB
mongoose.connect(process.env.BLOOMPLAN_MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
  });


// Ustawienie routingu
app.use('/api/auth', authRoutes);

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
