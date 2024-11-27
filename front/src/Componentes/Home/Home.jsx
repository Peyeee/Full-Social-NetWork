import './home.css';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Link } from "react-router-dom";
import IMGCosme from '../../assets/Img/sddefault.jpg';
import io from "socket.io-client";

function Home({ tweets, setTweets }) {
    const [tweetText, setTweetText] = useState('');
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [pfp, setpfp] = useState(null);
    const [imagen, setImagen] = useState(null);
    const socketRef = useRef();

    // Conectar el socket al montar el componente
    useEffect(() => {
        socketRef.current = io.connect("https://full-social-network.onrender.com");

        // Escuchar eventos de nuevos tweets
        socketRef.current.on("new_tweet", (newTweet) => {
            setTweets((prevTweets) => [...prevTweets, newTweet]);
            localStorage.setItem("tweets", JSON.stringify([...tweets, newTweet]));
        });

        // Desconectar el socket al desmontar el componente
        return () => socketRef.current.disconnect();
    }, [tweets]);

    // Cargar username y pfp desde localStorage al montar
    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        setpfp(localStorage.getItem("pfp"));
    }, []);

    const handleTweet = (e) => {
        e.preventDefault();

        if (tweetText.trim() !== '') {
            const newTweet = {
                text: tweetText,
                date: getTimeFormatted(), // HH:MM
                tweeterName: username,
                imagen: imagen,
            };

            // Emitir el tweet al servidor
            socketRef.current.emit("new_tweet", newTweet);

            // Actualizar localmente (opcional)
            setTweets((prevTweets) => [...prevTweets, newTweet]);
            localStorage.setItem("tweets", JSON.stringify([...tweets, newTweet]));
            setTweetText('');
        }
    };

    // Función para obtener la hora y minutos en formato HH:MM
    const getTimeFormatted = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const deleteTweet = (index) => {
        const updatedTweets = tweets.filter((_, tweetIndex) => tweetIndex !== index);
        setTweets(updatedTweets);
        localStorage.setItem("tweets", JSON.stringify(updatedTweets));
    };

    const displayTweets = location.pathname === '/home' ? tweets : [];

    useEffect(() => {
        // Obtener el usuario almacenado en localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setUsername(user.username);
            setImagen(`https://full-social-network.onrender.com/uploads/${user.imagen}`);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTweet(e);
        }
    };

    return (
        <>
            <NavBar texto="Home" otroTexto={<Link to='/mi-cuenta'>My account</Link>} />
            <div className="home-body-container" id='home-body-containerID'>
                <div className="home-body">
                    <div className="div-input">
                        <form onSubmit={handleTweet}>
                            <textarea
                                className="text-area"
                                id="textArea"
                                value={tweetText}
                                onChange={(e) => setTweetText(e.target.value)}
                                onKeyDown={handleKeyDown} // Escucha Enter
                            ></textarea>
                            <button className="button-idea" id="btn" type="submit">New idea?</button>
                        </form>
                    </div>

                </div>
                <div className="tweet-container">

                    <div className='home-body-tweets'>
                        <p>Alguno para viciar un cs?</p>
                        <p className='date'>10:25</p>
                        <p className='usernameHome'><Link to={`/cosme-fulanito`}>Cosme</Link></p>
                        <img />
                        <Link to={`/cosme-fulanito`}><img src="" alt="" /></Link>
                        <Link to={`/cosme-fulanito`}><img src={IMGCosme} alt="" className='pfpHome' /></Link>
                    </div>

                    {displayTweets.map((tweet, index) => (
                        <div className="home-body-tweets" key={index}>
                            <p className="tweetText">{tweet.text}</p>
                            <p className="date">{tweet.date}</p>
                            <p className="usernameHome"><Link to={`/mi-cuenta`}>{tweet.tweeterName}</Link></p>
                            {tweet.imagen && (
                                <img src={tweet.imagen} alt="Foto de perfil" className='pfpHome' />
                            )}
                            <button className="delete-btn" onClick={() => deleteTweet(index)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
