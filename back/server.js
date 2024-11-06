const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const Usuario = require('./models/usuariosModels'); // Importa el modelo de Usuario
const usuariosRoutes = require('./routes/usuariosRoutes');
const bodyParser = require('body-parser')

dotenv.config();


//! Middleware
app.use(express.json()); //* Para parsear JSON en las solicitudes
app.use(cors()); //* Para permitir acceso desde el frontend
app.use(bodyParser.urlencoded({ extended: true })); // Para poder leer los datos del formulario
app.use(express.urlencoded({ extended: true }));
//* Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// //!Guardar datos del formulario de inicio de sesión
// app.post("/save-usuarios", async (req, res) => {
//     const { username, email, password } = req.body;
//     console.log('Datos recibidos:', { username, email, password }); // Verifica los datos
//     try {
//         const nuevoUsuario = new Usuario({ username, email, password });
//         await nuevoUsuario.save(); // Guarda el nuevo usuario en la base de datos
//         res.redirect("http://localhost:5173/");
//     } catch (error) {
//         console.error(`Error al guardar el usuario: ${error}`,);
//         res.status(500).send('Error al guardar el usuario');
//     }
// });

//! RUTA RAIZ
// app.use("/", (req, res) => {
//     res.send("Datos recibido ")
// })

//! Definir rutas
app.use('/', require('./routes/usuariosRoutes'));

//!
app.use("/usuario", usuariosRoutes)

//! Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
