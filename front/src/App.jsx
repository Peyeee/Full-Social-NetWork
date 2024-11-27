import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/app.css';
import Login from '../src/Componentes/Login/Login.jsx';
import Home from '../src/Componentes/Home/Home.jsx';
import NavBar from './Componentes/NavBar/NavBar';
import MiAccount from './Componentes/Account/Account.jsx';
import Register from './Componentes/Register/Register.jsx';
import CosmeFulanito from './Componentes/CosmeFulanito/Cosme.jsx';

import { useEffect } from 'react';

import io from "socket.io-client"

const socket = io("https://full-social-network.onrender.com", {
  transports: ["websocket"]
});

function App() {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [pfp, setpfp] = useState(null)

  useEffect(() => {
    // Escuchar eventos
    socket.on("connect", () => {
      console.log("Conectado a Socket.IO:", socket.id);
    });

    socket.on("new_tweet", (tweet) => {
      console.log("Nuevo tweet recibido:", tweet);
    });

    // Limpiar al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <Routes basename="/SocialNetwork-Mini-Project">
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route path="/home" element={<Home tweets={tweets} setTweets={setTweets} username={username} pfp={pfp} />} />
        <Route path="/mi-cuenta" element={<MiAccount setpfp={setpfp} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cosme-fulanito' element={<CosmeFulanito />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
