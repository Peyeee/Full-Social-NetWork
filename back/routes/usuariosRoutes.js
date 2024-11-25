const express = require('express');
const router = express.Router();
const multer = require('multer');
const usuariosController = require('../controllers/usuariosControllers.js');
const Usuario = require("../models/usuariosModels")
const bcrypt = require('bcrypt');
const path = require('path')
const imageController = require('../controllers/imageController');


//! ROUTER PARA ARCHIVOS MULTIMEDIAS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads")); // Ruta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    }
});

//!VALIDAR EL ARCHIVO DE LA IMAGEN
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Formatos permitidos
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Verifica la extensión del archivo
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true); // Archivo válido
    } else {
        cb("Error: el archivo debe ser una imagen (jpeg, jpg, png, gif)!"); // Archivo no válido
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

//! BUSCAR USUARIO EN LA BASE DE DATOS
router.post('/get-usuarios', async (req, res) => {
    const { username, password } = req.body;
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

        //?JSON
        res.status(200).json({
            username: usuario.username,
            email: usuario.email,
            imagen: usuario.imagen
        })

        // //? SI COINCIDE LO REDIRECCIONA
        // return res.redirect("http://localhost:5173/home")
    } catch (error) {
        console.log("Error al obtener los usuarios" + error);
        res.status(500).send("No se pudo obtener los usuarios")
    }
});

//!RUTA PARA MOSTRAR IMAGEN
router.get("/image:id", async (req, res) => {
    const { id } = req.params;
    try {
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ message: "imagen no encontrada", error })
        };
        res.set('Content-Type', image.contentType);
        res.send(image.imageData);
    } catch (err) {
        res.status(500).json({ message: `Error al obtener la imagen ${err}`, error: err });
    }
})

//! CREAR USUARIOS
router.post("/save-usuarios", upload.single("imagen"), async (req, res) => {
    const { username, email, password } = req.body;
    const imagenPath = req.file ? req.file.filename : "";
    try {

        //? GENERAR "ENCRIPTADOR DE CONTRASEÑAS"
        const salt = await bcrypt.genSalt(10)

        //? ENCRIPTAR LA CONTRASEÑA
        const hashedPassword = await bcrypt.hash(password, salt)

        const nuevoUsuario = new Usuario({
            username,
            email,
            password: hashedPassword,
            imagen: imagenPath,
        });

        //? Guarda el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        //? Verifica los datos
        console.log('Datos recibidos:', { username, email, password });  //!QUITAR EN UN FUTURO
        console.log('req.file:', req.file); // Verifica el archivo cargado
        console.log('req.body:', req.body); // Verifica los demás datos
        //? REDIRECCIONAR
        res.redirect("http://localhost:5173")



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

//! CARGAR PFP
router.post('/upload', async (req, res) => {
    upload.single('image'), imageController.uploadImage
})



// //! ELIMINAR USUARIOS
// router.delete('/:id', usuariosController.eliminarUsuarios);

module.exports = router;

