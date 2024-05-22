// server.js ou app.js (exemple de backend Node.js/Express)
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3003;

// Utilisez CORS pour autoriser les requêtes cross-origin
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre application front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Route pour le téléchargement d'images
app.post('/api/uploadImage', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({ fileName: req.file.filename, filePath: `/uploads/${req.file.filename}` });
});

// Route pour récupérer les fichiers téléchargés
app.get('/api/files', (req, res) => {
  // Logique pour récupérer les fichiers
  res.status(200).send([]);
});

// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

