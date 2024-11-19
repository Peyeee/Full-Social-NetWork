import './login.css';
import Img2 from '../../assets/Img/goofy-relaxed-goat.png';
import { FaGoogle, FaMicrosoft, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { motion } from 'framer-motion';

function Main() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Guardar username en localStorage
        localStorage.setItem('username', username);

        // Redirigir a la página de inicio
        navigate('/home');
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
        >
            <>
                <NavBar texto="Create Account" className="navBarDisapear" otroTexto={<Link to={'/register'}>Register</Link>} />
                <div className="login-body">
                    <div className='sectionContainer' id='login'>
                        <section className='Login-Section'>
                            <div className='Login-Section-Div-Padre'>
                                <div className='Div-top-SingIn'>
                                    <span>Sign In</span>
                                    <p>Hey, Enter your details to login to your account</p>
                                </div>
                                <div className='Div-Mid-Data'>
                                    <form action="http://localhost:5000/get-usuarios" method='POST' className='formLogin' onSubmit={handleSubmit} >
                                        <label htmlFor="pfp"></label>
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id='passwordLogin' name='password' />

                                        <button type='submit' className='buttonSign'>Enviar</button>
                                    </form>
                                </div>
                                <div className='Div-Bottom'>
                                    <span> -Or Sign In with- </span>
                                    <div>
                                        <div className='cardsSocialMedias'>
                                            <FaGoogle className='iconsSocialMedia' />
                                            <span>Google</span>
                                        </div>
                                        <div className='cardsSocialMedias'>
                                            <FaMicrosoft className='iconsSocialMedia' />
                                            <span>Microsoft</span>
                                        </div>
                                        <div className='cardsSocialMedias'>
                                            <FaFacebook className='iconsSocialMedia' />
                                            <span>Facebook</span>
                                        </div>
                                    </div>
                                    <span>Don't have an account?</span><Link to={'/register'}>Register Now?</Link>
                                </div>
                            </div>
                        </section>
                        <div className='img-container'>
                            <img src={Img2} alt="" className='img' />
                        </div>
                    </div>
                </div>
            </>
        </motion.div>
    );
}

export default Main;
