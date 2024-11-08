import '../NavBar/navbar.css';
import { TbWorld } from "react-icons/tb";
import Logo from '../../assets/Img/NetSpark_Logo.png'
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { IoSearch } from "react-icons/io5";


function NavBar(props) {
    return (
        <header className='headerHeader'>
            <nav className='navHeader'>
                <div className='div-logo'>
                    <Link to={'/home'}>
                        <img src={Logo} alt="" width="300px" className='logoHome' />
                    </Link>
                </div>
                <div className='other'>
                    <ul className='li CreateAccount textNavBar'>{props.texto}</ul>
                    <ul className='li SingUp textNavBar'>{props.otroTexto}</ul>
                    <ul className='li TbWorld textNavBar'>
                        <TbWorld></TbWorld>
                    </ul>
                </div>
                <div className='div-input-search'>
                    <input type="text" className='inputSearch'/>
                    <IoSearch className='searchIcon'/>
                </div>
            </nav>
        </header >
    );
}

export default NavBar;
