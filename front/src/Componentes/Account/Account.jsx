import '../Account/account.css';
import { Link } from 'react-router-dom';
import { MdAddToPhotos } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar/NavBar';

function MyAccount() {
    const [follow, setFollow] = useState(false);
    const buttonRef = useRef(null);
    const followRef = useRef(null);
    const followRefButton = useRef(null);

    const handleFollow = () => {
        setFollow(!follow);
        if (follow) {
            followRefButton.current.innerText = "Follow";
            followRef.current.innerText--;
        } else {
            followRefButton.current.innerText = "Followed";
            followRef.current.innerText++;
        }
    };

    const [imagen, setImagen] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagen(imageURL);
            localStorage.setItem('pfp', imageURL); // Almacena la URL en localStorage
        }
    };

    useEffect(() => {
        const storedImage = localStorage.getItem('pfp');
        if (storedImage) {
            setImagen(storedImage);
        }
    }, []);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate("/")
        }
    }, [navigate()]);

    const [description, setDescription] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aut itaque debitis ratione sunt, ut nobis...');
    const [isEditing, setIsEditing] = useState(false);

    const handleEditDescription = () => {
        if (isEditing) {
            localStorage.setItem('description', description); // Guarda la descripción en localStorage
        } else {
            setDescription(description); // Entra en modo edición
        }
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        const storedDescription = localStorage.getItem('description');
        if (storedDescription) {
            setDescription(storedDescription);
        }
    }, []);

    //! FUNCION PARA OBTENER EL NOMBRE DESDE LA DB
    useEffect(() => {
        const getUsername = async () => {
            try {
                let response = await fetch("http://localhost:5000/get-usuarios");
                let data = await response.json;
                let setUsername = (data.username)
            } catch (error) {
                console.error("error al obtener el nombre" + error)
            };
        };
        getUsername()
    }, [])

    //!FUNCION PARA ENVIAR EL NOMBRE AL DOM
    const enviarDatos = async () => {
        const body = { username };

        try {
            const response = await fetch("http://localhost:5000/get-usuarios", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Respuesta del servidor:', result);
            } else {
                console.error('Error al enviar datos:', response.status);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }
    return (
        <>
            <NavBar texto={<Link to='/home'>Home</Link>} otroTexto={<Link to='/mi-cuenta'>My account</Link>} />
            <div className='Body-Container_Account'>
                <div className='pruebaPrimera'>
                    {imagen && <img src={imagen} alt="Profile" className='imagenPpt' />}
                </div>
                <div className='Body-Container_Account-edit'>
                    <div className='Prueba'>
                        <div className='Body-Container_Account-Name'>
                            <h3 className='Body-Container_Account-h3'>{username}</h3>
                            <button className="ButtonImg" onClick={handleButtonClick}>
                                <MdAddToPhotos className='iconPhoto' />
                            </button>
                        </div>
                        <div className='Body-Container_Account-Followers'>
                            <span className='span Followers'>
                                Followers: <span ref={followRef}>783</span>
                            </span>
                            <span className='span Follows'>Follows: 346</span>
                            <span className='span Likes'>Likes: 128736</span>
                        </div>
                        <div className='Body-Container_Account-Biography'>
                            {isEditing ? (
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    cols="50"
                                    className='textAreaDescription'
                                />
                            ) : (
                                <p>{description}</p>
                            )}
                            <button className="btn-edit-description" onClick={handleEditDescription}>
                                {isEditing ? 'Save' : 'Edit Description'}
                            </button>
                        </div>
                        <div className='DivButton'>
                            {/* <button ref={buttonRef} className="btn btn-shadow btn-shadow--purple" onClick={handleFollow}>
                                    <span ref={followRefButton}>Follow</span>
                                </button> */}
                        </div>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
}

export default MyAccount;
