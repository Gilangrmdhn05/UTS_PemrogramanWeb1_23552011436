// api.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ===== Data Dummy =====
let users = [
  { id: 1, fullname: "Gilang Ramadhan", email: "gilang@example.com", password: "123456" }
];

let details = [
  { id: 1, title: "Pencapaian dan Peringkat ESG", img: "https://storage.googleapis.com/xurya-app-files/odoo-cms/images/customer-logo/mwhopdyx5yiq0vliadsqpp.jpeg", desc: "PT Nusantara Energi Lestari berhasil meraih berbagai penghargaan..." },
  { id: 2, title: "Komitmen Keberlanjutan", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqR7ELcRtx9HWjKzD3bUQcbXUli2AYz0LUg&s", desc: "Perusahaan terus berinvestasi pada proyek-proyek energi terbarukan..." },
  { id: 3, title: "Laporan dan Publikasi", img: "https://lh4.googleusercontent.com/uTTwh2LbdHeA285q5Q-TJIiP5J3o_Ij7sR6mB_5gQdiG8BsGcjBO907DvNLmMyCZQlbQKssPUlGUkIKqo8wTz8YrabUMq1qCGeTAtxcd7xfy55teGiWvbenJ-S3JZCCMWmFaqYaVwrJ0qcL1l3-9fMs", desc: "Setiap tahun, PT Nusantara Energi Lestari merilis laporan keberlanjutan..." }
];

// ===== Routes Users =====
app.get('/users', (req, res) => res.json(users));
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.json(user);
});
app.post('/users', (req, res) => {
  const { fullname, email, password } = req.body;
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const newUser = { id, fullname, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const { fullname, email, password } = req.body;
  user.fullname = fullname || user.fullname;
  user.email = email || user.email;
  user.password = password || user.password;
  res.json(user);
});
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User tidak ditemukan" });
  users.splice(index, 1);
  res.json({ message: "User berhasil dihapus" });
});

// ===== Routes Details =====
app.get('/details', (req, res) => res.json(details));
app.get('/details/:id', (req, res) => {
  const detail = details.find(d => d.id === parseInt(req.params.id));
  if (!detail) return res.status(404).json({ message: "Data tidak ditemukan" });
  res.json(detail);
});
app.post('/details', (req, res) => {
  const { title, img, desc } = req.body;
  const id = details.length ? details[details.length - 1].id + 1 : 1;
  const newDetail = { id, title, img, desc };
  details.push(newDetail);
  res.status(201).json(newDetail);
});
app.put('/details/:id', (req, res) => {
  const detail = details.find(d => d.id === parseInt(req.params.id));
  if (!detail) return res.status(404).json({ message: "Data tidak ditemukan" });
  const { title, img, desc } = req.body;
  detail.title = title || detail.title;
  detail.img = img || detail.img;
  detail.desc = desc || detail.desc;
  res.json(detail);
});
app.delete('/details/:id', (req, res) => {
  const index = details.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });
  details.splice(index, 1);
  res.json({ message: "Data berhasil dihapus" });
});

// ===== Start Server =====
app.listen(PORT, () => console.log(`CRUD API Bruno berjalan di http://localhost:${PORT}`));
