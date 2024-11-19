const imageService = require('../services/imageService');

const uploadImage = async (req, res) => {
    try {
        const imageData = req.file; // Obtenemos la imagen desde multer
        const savedImage = await imageService.saveImage(imageData);
        res.status(201).json({ message: 'Imagen guardada exitosamente', data: savedImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
};

module.exports = { uploadImage };
