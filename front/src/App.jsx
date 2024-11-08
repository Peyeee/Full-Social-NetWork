import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/app.css';
import Login from '../src/Componentes/Login/Login.jsx';
import Home from '../src/Componentes/Home/Home.jsx';
import NavBar from './Componentes/NavBar/NavBar';
import MiAccount from './Componentes/Account/Account.jsx';
import Register from './Componentes/Register/Register.jsx';
import CosmeFulanito from './Componentes/CosmeFulanito/Cosme.jsx';
function App() {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [pfp, setpfp] = useState(null)
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
