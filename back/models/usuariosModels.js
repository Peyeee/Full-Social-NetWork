const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, bcrypt: true },
    password: { type: String, required: true },
    imagen: { type: String, default: '' }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario
