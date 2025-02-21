const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

// Penyimpanan data sementara (in-memory)
let schedules = {};

// Route: Halaman awal untuk membuat jadwal baru
app.get('/', (req, res) => {
    res.render('home');
});

// Route: Menyimpan jadwal baru
app.post('/jadwal', (req, res) => {
    // Membuat id unik (menggunakan timestamp sebagai contoh)
    const id = Date.now().toString();
    const { title, date, description } = req.body;
    schedules[id] = { id, title, date, description };
    // Redirect ke halaman jadwal dengan id
    res.redirect(`/jadwal/${id}`);
});

// Route: Menampilkan jadwal berdasarkan id
app.get('/jadwal/:id', (req, res) => {
    const id = req.params.id;
    const schedule = schedules[id];
    if (schedule) {
        res.render('schedule', { schedule });
    } else {
        res.send('Jadwal tidak ditemukan.');
    }
});

// Route: Menampilkan form untuk mengubah jadwal
app.get('/jadwal/:id/edit', (req, res) => {
    const id = req.params.id;
    const schedule = schedules[id];
    if (schedule) {
        res.render('edit', { schedule });
    } else {
        res.send('Jadwal tidak ditemukan.');
    }
});

// Route: Menyimpan perubahan jadwal
app.post('/jadwal/:id/edit', (req, res) => {
    const id = req.params.id;
    const { title, date, description } = req.body;
    if (schedules[id]) {
        schedules[id] = { id, title, date, description };
        res.redirect(`/jadwal/${id}`);
    } else {
        res.send('Jadwal tidak ditemukan.');
    }
});

// Route: Menghapus jadwal
app.post('/jadwal/:id/delete', (req, res) => {
    const id = req.params.id;
    if (schedules[id]) {
        delete schedules[id];
        res.redirect('/');
    } else {
        res.send('Jadwal tidak ditemukan.');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
