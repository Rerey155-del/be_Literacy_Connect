require("dotenv").config(); // Load .env variables

const express = require("express");
const db = require("./db");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");



const multer = require("multer"); // Middleware untuk menangani form-data
const upload = multer(); // Middleware untuk menangani form-data

app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

app.get("/donatur", (req, res) => {
  const query = "SELECT * FROM donatur";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal mengambil data", details: err });
    }
    res.json(results);
  });
});
app.get("/campaign", (req, res) => {
  const query = "SELECT * FROM campaign";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal mengambil data", details: err });
    }
    res.json(results);
  });
});

// PUT update campaign nominal by ID
app.put("/campaign/:id", (req, res, next) => {
  const { id } = req.params;
  const { nominal } = req.body;

  console.log("Nominal yang diterima:", nominal); // Tambahkan log ini untuk debugging

  if (!id || isNaN(id)) {
      return res.status(400).json({ message: "ID tidak valid." });
  }

  if (!nominal || isNaN(nominal)) {
      return res.status(400).json({ message: "Nominal tidak valid." });
  }

  // Menggunakan callback style tanpa promise
  db.query(
      "UPDATE campaign SET nominal = nominal + ? WHERE id = ?",
      [nominal, id],
      (err, result) => {
          if (err) {
              console.error("Error saat memperbarui nominal:", err);
              return next(err);
          }

          if (result.affectedRows === 0) {
              return res.status(404).json({ message: "Data tidak ditemukan." });
          }

          res.status(200).json({ message: `Nominal berhasil diperbarui dengan nilai tambahan ${nominal}.` });
      }
  );
});




app.get("/campaign/:id", (req, res) => {
  const { id } = req.params; // Ambil parameter id dari URL
  const query = "SELECT * FROM campaign WHERE id = ?"; // Query untuk mendapatkan data berdasarkan id

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal mengambil data", details: err });
    }

    if (results.length === 0) {
      // Jika data tidak ditemukan
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    res.json(results[0]); // Kembalikan hanya data pertama (karena id bersifat unik)
  });
});

app.post("/donatur", upload.none(), (req, res) => {
  // Data akan tersedia di req.body
  const { nama, email, password, nomor_telepon } = req.body;

  if (!nama || !email || !password ) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }

  const query = `
        INSERT INTO donatur (nama, email, password, nomor_telepon)
        VALUES (?, ?, ?, ?)
    `;
  const values = [nama, email, password, nomor_telepon];

  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal menambahkan data", details: err });
    }

    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: {
        id_donatur: result.insertId,
        nama,
        email,
        password,
        nomor_telepon,
      },
    });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
