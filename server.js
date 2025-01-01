require('dotenv').config(); // Load .env variables

const express = require('express');
const db = require('./db'); 
const app = express();
const port = process.env.PORT || 5000;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk mendapatkan data dari tabel "donatur"
app.get('/donatur', (req, res) => {
    const query = 'SELECT * FROM donatur'; // Pastikan tabel 'donatur' ada
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal mengambil data', details: err });
        }
        res.json(results); // Mengirim data sebagai JSON
    });
});

app.

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
