require('dotenv').config(); // Load environment variables
const mysql = require('mysql2');

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // Pastikan database dipilih di sini
});

// Tes koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Error menghubungkan SQL:', err);
    } else {
        console.log('Terhubung ke database MySQL:', process.env.DB_NAME);
    }
});

module.exports = db;
