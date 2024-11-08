import './home.css';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Link } from "react-router-dom";
import IMGCosme from '../../assets/Img/sddefault.jpg';

function Home({ tweets, setTweets }) {
    const [tweetText, setTweetText] = useState('');
    const tweetContainerRef = useRef(null);
    const location = useLocation();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const getData = () => {
            return localStorage.getItem("username");
        };
        setUsername(getData());
    }, []);

    const displayTweets = location.pathname === '/home' ? tweets : [];
    const [pfp, setpfp] = useState(null);

    const getIMG = () => {
        return localStorage.getItem('pfp');
    }

    useEffect(() => {
        const imgsrc = localStorage.getItem('pfp');
        setpfp(getIMG());
    }, []);

    // Función para obtener la hora y minutos en formato HH:MM
    const getTimeFormatted = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const handleTweet = () => {
        if (tweetText.trim() !== '') {
            getIMG();
            const newTweet = {
                text: tweetText,
                date: getTimeFormatted(), // Usar el formato de hora y minutos
                tweeterName: username,
                imagen: pfp,
            };
            const updatedTweets = [...tweets, newTweet];
            setTweets(updatedTweets);
            // Guarda los tweets actualizados en localStorage
            localStorage.setItem("tweets", JSON.stringify(updatedTweets));
            setTweetText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el salto de línea en el textarea
            handleTweet(); // Llama a la función que maneja el tweet
        }
    };

    const deleteTweet = (index) => {
        const updatedTweets = tweets.filter((_, tweetIndex) => tweetIndex !== index);
        setTweets(updatedTweets);
        localStorage.setItem("tweets", JSON.stringify(updatedTweets));
    }

    return (
        <>
            <NavBar texto="Home" otroTexto={<Link to='/mi-cuenta'>My account</Link>} />
            <div className="home-body-container" id='home-body-containerID'>
                <div className="home-body">
                    <div className="div-input">
                        <textarea
                            className="text-area"
                            id="textArea"
                            value={tweetText}
                            onChange={(e) => setTweetText(e.target.value)}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                    </div>
                    <div className="div-card-home">
                        <div className="div-button">
                            <button className="button-idea" id="btn" onClick={handleTweet}>New idea?</button>
                        </div>
                    </div>
                </div>
                <div ref={tweetContainerRef} className="tweet-container">
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
                            <p className='tweetText'>{tweet.text}</p>
                            <p className="date">{tweet.date}</p>
                            <p className="usernameHome"><Link to={`/mi-cuenta`}>{tweet.tweeterName}</Link></p>
                            <img src={tweet.imagen} alt="Foto de perfil" className='pfpHome' />
                            <button className="delete-btn" onClick={() => deleteTweet(index)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
