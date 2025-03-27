require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pertemuan6",
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi Database gagal:", err);
        return;
    }
    console.log("Connected ke MySQL");
});

// API untuk mendapatkan semua mahasiswa
app.get("/mahasiswa", (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

// API untuk menambah mahasiswa baru
app.post("/mahasiswa", (req, res) => {
    const { nama, prodi } = req.body;
    db.query(
        "INSERT INTO mahasiswa (nama, prodi) VALUES (?, ?)",
        [nama, prodi],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: "Mahasiswa berhasil ditambahkan" });
        }
    );
});

// API untuk menghapus mahasiswa
app.delete("/mahasiswa/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM mahasiswa WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Mahasiswa berhasil dihapus" });
    });
});

// Jalankan server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
