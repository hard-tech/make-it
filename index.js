const express = require('express');
// const fastAPI
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

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
    const folderName = req.params.folderName;
    const uploadPath = path.join(__dirname, 'uploads', folderName);

    // Vérifiez si le dossier existe, sinon créez-le
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Route pour le téléchargement d'images
app.post('/api/uploadImage/:folderName', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({message: "File uploaded successfully !"});
});

app.get('/api/compileScreens/:folderName', (req, res) => {
    // Lancer la commande de compilation
    const folderName = req.params.folderName;
    const command = `python3 script-py/compilling.py uploads/${folderName}`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return res.status(500).send('Error processing file.');
      }
  
      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return res.status(500).send('Error processing file.');
      }
  
      console.log(`Script stdout: ${stdout.trim()}`);
      res.status(200).send({
        message: "File compiled successfully!",
        pathCompileFile: `/outputs/${folderName}.pdf`
      });
    });
});

// Route pour récupérer les fichiers téléchargés
app.get('/api/files', (req, res) => {
  // Logique pour récupérer les fichiers
  res.status(200).send([]);
});

// Servir les fichiers statiques
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});