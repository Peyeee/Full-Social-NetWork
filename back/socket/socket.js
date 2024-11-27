//!SOCKET
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Cambia la URL según tu backend
io.on('connection', (socket) => {
    console.log('a user connected');
});

export default socket;
