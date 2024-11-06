const mongoose = require('mongoose');
require('dotenv').config(); // Variables de entorno en .env
const MONGODB_URL = process.env.MONGODB_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {});
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Salir de la aplicación con error
    }
};

module.exports = connectDB;
