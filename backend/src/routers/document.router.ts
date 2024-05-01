
const multer = require('multer');
const path = require('path');
const fs = require('fs');
import {db} from "../server";
const express = require('express');
const router = express.Router();
const pool = require('../server');

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, 'uploads/');
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

  const upload = multer({ storage });

  // Route pour uploader un document PDF
  router.post('/', upload.single('pdf'), (req:any, res:any) => {
    const { description } = req.body;
    const pdfPath = req.file.path;
  
    const sql = 'INSERT INTO document (lien, description) VALUES (?, ?)';
    db.query(sql, [pdfPath, description], (err:any, result:any) => {
      if (err) {
        console.error("Error during:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("successfully:", result);
        res.status(200).send(result);
      }
    });
  });
  
  router.get('/', (req:any, res:any) => {
    const uploadDirectory = path.join("D:/MesProjets/ProjetInteg/StudyStack/backend/src", 'uploads');
    console.log("Upload directory:", uploadDirectory);
    // Lire les fichiers dans le répertoire "uploads"
    fs.readdir(uploadDirectory, (err:any, files:any) => {
      if (err) {
        console.error("Error reading files:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Filtrer les fichiers pour inclure uniquement les PDF
        const pdfFiles = files.filter((file:any) => path.extname(file).toLowerCase() === '.pdf');
        res.status(200).json(pdfFiles);
      }
    });
  });
  
export default router;