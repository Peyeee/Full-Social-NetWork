const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControllers.js');
const Usuario = require("../models/usuariosModels")
const bcrypt = require('bcrypt');


//! BUSCAR USUARIO EN LA BASE DE DATOS
router.get('/get-usuarios', async (req, res) => {
    const { username, password } = req.query;
    try {

        //? VERIFICAR SI EL USUARIO EXISTE
        const usuario = await Usuario.findOne({ username }); //*Buscar Usuario
        if (!usuario) {
            res.status(404).send("Usuario no encontrado", username)
            console.log("usuarios Recuperados", usuario)
        }

        //? VERIFICA QUE LAS CONTRASEÑAS SEAN LAS MISMAS
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).send("Contraseña incorrecta");
        }

        //? SI COINCIDE LO REDIRECCIONA
        return res.redirect("http://localhost:5173/home")
    } catch (error) {
        console.log("Error al obtener los usuarios" + error);
        res.status(500).send("No se pudo obtener los usuarios")
    }
});



//! CREAR USUARIOS
router.post("/save-usuarios", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //? GENERAR "ENCRIPTADOR DE CONTRASEÑAS"
        const salt = await bcrypt.genSalt(10)

        //? ENCRIPTAR LA CONTRASEÑA
        const hashedPassword = await bcrypt.hash(password, salt)
        const nuevoUsuario = new Usuario({ username, email, password: hashedPassword });

        //? Guarda el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        //? Verifica los datos
        console.log('Datos recibidos:', { username, email, password });  //!QUITAR EN UN FUTURO

        //? REDIRECCIONAR
        res.redirect("http://localhost:5173/")
    } catch (error) {
        console.error(`Error al guardar el usuario: ${error}`,);
        res.status(500).send('Error al guardar el usuario');
    }
});

// //! ACTUALIZAR USUARIOS
router.put('/edit-usuarios', async (req, res) => {
    const { username, bio } = req.body;
    try {
        const updatedUser = await Usuario.findByIdAndUpdate(username, bio)
        if (!updateUser) {
            return res.status(404).json("error" + error)
        }
        return res.status(200).json(updatedUser)
    }
    catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
});

// //! ELIMINAR USUARIOS
// router.delete('/:id', usuariosController.eliminarUsuarios);

module.exports = router;

