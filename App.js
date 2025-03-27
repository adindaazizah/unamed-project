import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [nama, setNama] = useState("");
    const [prodi, setProdi] = useState("");
    const [editId, setEditId] = useState(null);
    const [editNama, setEditNama] = useState("");
    const [editProdi, setEditProdi] = useState("");

    // Ambil data mahasiswa dari backend
    useEffect(() => {
        fetchMahasiswa();
    }, []);

    const fetchMahasiswa = async () => {
        try {
            const response = await axios.get("http://localhost:3001/mahasiswa");
            setMahasiswa(response.data);
        } catch (error) {
            console.error("Error fetching mahasiswa:", error);
        }
    };

    // Tambah mahasiswa baru
    const tambahMahasiswa = async () => {
        try {
            await axios.post("http://localhost:3001/mahasiswa", { nama, prodi });
            fetchMahasiswa();
            setNama("");
            setProdi("");
        } catch (error) {
            console.error("Error saat menambahkan data mahasiswa:", error);
        }
    };

    // Hapus mahasiswa
    const deleteMahasiswa = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/mahasiswa/${id}`);
            fetchMahasiswa();
        } catch (error) {
            console.error("Error saat menghapus data mahasiswa:", error);
        }
    };

    // Set data mahasiswa yang mau diedit
    const startEdit = (student) => {
        setEditId(student.id);
        setEditNama(student.nama);
        setEditProdi(student.prodi);
    };

    // Simpan perubahan mahasiswa yang diedit
    const saveEdit = async () => {
        try {
            await axios.put(`http://localhost:3001/mahasiswa/${editId}`, {
                nama: editNama,
                prodi: editProdi,
            });
            fetchMahasiswa();
            setEditId(null);
        } catch (error) {
            console.error("Error saat mengupdate data mahasiswa:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Data Mahasiswa UPN Veteran Jakarta</h1>

            {/* Form Tambah Mahasiswa */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Masukkan Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Masukkan Prodi"
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                />
                <button className="btn btn-success w-100" onClick={tambahMahasiswa}>
                    Tambah Mahasiswa
                </button>
            </div>

            {/* List Mahasiswa */}
            <ul className="list-group">
                {mahasiswa.map((student) => (
                    <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editId === student.id ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={editNama}
                                    onChange={(e) => setEditNama(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={editProdi}
                                    onChange={(e) => setEditProdi(e.target.value)}
                                />
                                <button className="btn btn-primary btn-sm me-2" onClick={saveEdit}>
                                    Simpan
                                </button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                                    Batal
                                </button>
                            </>
                        ) : (
                            <>
                                {student.nama} - {student.prodi}
                                <div>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(student)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteMahasiswa(student.id)}>
                                        Hapus
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
