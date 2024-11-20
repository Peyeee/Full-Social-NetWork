import Main from '../Login/Login';
import '../Register/register.css'
import Img from '../../assets/goofy-dachshund.png'
import Gif from '../../assets/goofy-thoughtful-cat.gif'
import Img2 from '../../assets/goofy-smiling-monkey.png'
import { FaUser } from "react-icons/fa6";
import { BiShowAlt } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Register(props) {
    const [imagen, setImagen] = useState(null);

    const changeType = () => {
        const input = document.getElementById('inputPassword');
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }


    const iconEye = document.getElementById("iconEye")


    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const spanError = document.createElement("span");
    const div = document.getElementById("Div-Mid-Data")
    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[_!]).{1,}$/;
        if (password === '') {
            setError("Por favor, ingrese una contraseña");
        } else if (!regex.test(password)) {
            console.log('Por favor, ingrese una contraseña con mayúscula, minúscula, un número y un carácter especial.')
            setError("Por favor, ingrese una contraseña con mayúscula, minúscula, un número y un carácter especial.");;
        } else {
            navigate('/home');
        }
    };
    const inputPassword = useRef(null);
    const [passWordHide, setpasswordHide] = useState(true)

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handlePasswordHide = () => {
        setpasswordHide(!passWordHide);
        if (inputPassword.current) {
            inputPassword.current.type = passWordHide ? 'text' : 'password';
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagen(imageURL);
            localStorage.setItem('pfp', imageURL); // Almacena la URL en localStorage
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
        >
            <>
                <NavBar texto={<Link to={'/'}>Login</Link>} otroTexto="Create Account   " />

                <div className="login-body">
                    <div className='sectionContainer sectionContainerRegister' id='login'>
                        <section className='Login-SectionRegiser'>
                            <div className='Login-Section-Div-Padre Login-Section-Div-PadreRegister'>
                                <div className='Div-top-SingIn'>
                                    <span>Register {props.register}</span>
                                    <p>Hey, Enter your details to create your account</p>
                                </div>
                                <div className='Div-Mid-Data'>
                                    {/* ! This component needs to handle error states */}

                                    <form action="http://localhost:5000/save-usuarios" method='POST' className='formRegister' enctype="multipart/form-data">
                                    <input type="file" name='pfp' />
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id='username' name='username' required />

                                    <label htmlFor="email">Email:</label>
                                    <input type="text" id='email' name='email' />

                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id='password' name='password' />
                                    <button type='submit' className='buttonLog'>Enviar</button>
                                </form>
                            </div>
                            <div className='Div-Bottom'>
                                <span > -Or Sign In with- </span>
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
                                <span>Already have an account?</span><Link to={'/'}>Log In</Link>
                            </div>
                    </div>
                </section >
                <div className='img-container'>
                    <img src={Img2} alt="" className='img' />
                </div>
            </div >
        </div>
            </>

        </motion.div >

    )
}


export default Register