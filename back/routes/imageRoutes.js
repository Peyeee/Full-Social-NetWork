const express = require('express');
const router = express.Router();
const upload = require('../utils/upload'); // Configuración de multer
const imageController = require('../controllers/imageController');

router.post('/upload', upload.single('image'), imageController.uploadImage);

module.exports = router;
