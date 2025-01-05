// backend/db.js
const { MongoClient, ServerApiVersion } = require('mongodb'); // Add ServerApiVersion here
const path = require('path');

const credentials = path.join(__dirname, 'certs', 'X509-cert-6099982590958055574.pem');
const uri = 'mongodb+srv://cluster0.s9w9q.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0';

let client;
let db;

async function connectToDatabase() {
  if (db) return db; // Return the existing connection if it's already established

  try {
    client = new MongoClient(uri, {
      tlsCertificateKeyFile: credentials,
      serverApi: ServerApiVersion.v1,
    });

    await client.connect();
    db = client.db('test'); // Use the 'test' database
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getDb() {
  if (!db) throw new Error('Database not connected');
  return db;
}

module.exports = { connectToDatabase, getDb };