import { useEffect, useState } from 'react'
import { MdCatchingPokemon } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import IconButton from '@mui/material/IconButton';
import '../css/Header.css'
import { FaMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";

function Header() {

    const [theme, setTheme] = useState(true);

    const changeTheme = () => {
        setTheme(prev => !prev);
    };

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme ? "light" : "dark"
        );
    }, [theme]);

    return (
        <nav className="navbar">
            <a className="logo-link">
                <MdCatchingPokemon size={35} color="#ef6262" />
                <span className="logo-text">
                    Poké
                    <span className="logo-accent">Atlas</span>
                </span>
            </a>
            <div className="navbar-btn">
                <IconButton className="navbar-icon-btn" href="#navbar-search-btn">
                    <CiSearch className="navbar-icon" />
                </IconButton>

                <IconButton className="navbar-icon-btn">
                    {
                        theme ? <FaMoon className="navbar-icon" onClick={changeTheme} /> : <CiLight className="navbar-icon" onClick={changeTheme} />
                    }
                </IconButton>

            </div>
        </nav>
    )
}

export default Header