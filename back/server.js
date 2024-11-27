const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const Usuario = require('./models/usuariosModels');
const usuariosRoutes = require('./routes/usuariosRoutes');
const bodyParser = require('body-parser')
const session = require("express-session");
const path = require('path');
const helmet = require('helmet');

require('dotenv').config();

//!Socket 
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://full-social-network-1.onrender.com",
        methods: ["GET", "POST", "DELETE"]
    },
    transports: ["websocket", "polling"]
});

//?IO
io.on('connection', (socket) => {
    console.log(`usuario conectado: ${socket.id}`)

    socket.on("new_tweet", (tweet) => {
        console.log("Nuevo tweet recibido:", tweet);
        // Retransmitir el tweet a todos los clientes
        io.emit("new_tweet", tweet);
    })
});

//!DotEnv
dotenv.config();

//! Middleware
app.use(express.json()); //* Para parsear JSON en las solicitudes

//!Cors
app.use(cors({
    origin: 'https://full-social-network-1.onrender.com', // Cambia esto al origen de tu frontend   
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());
//!MiddleWare Formulario
app.use(bodyParser.urlencoded({ extended: true })); // Para poder leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//!Conectar a la DB
mongoose.connect(process.env.MONGODB_URI)

//! Inicializar la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

//! Definir rutas
app.use('/', require('./routes/usuariosRoutes'));
app.use("/usuario", usuariosRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//! Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
