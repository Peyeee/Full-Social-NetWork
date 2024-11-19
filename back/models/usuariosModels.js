const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, bcrypt: true },
    password: { type: String, required: true },
    pfp: { type: String, required: true }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario
