import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img
                        src="https://www.zillowstatic.com/s3/pfs/static/z-logo-default-visual-refresh.svg"
                        alt="zillow logo"
                    />
                </Link>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                ☰
            </div>

            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <ul className='nav-left'>
                    <li><Link to="/buy">Buy</Link></li>
                    <li><Link to="/rent">Rent</Link></li>
                    <li><Link to="/sell">Sell</Link></li>
                    <li><Link to="/mortgage">Get a mortgage</Link></li>
                    <li><Link to="/agent">Find an Agent</Link></li>
                </ul>

                <ul className='nav-right'>
                    <li><Link to="/rentals">Manage Rentals</Link></li>
                    <li><Link to="/advertise">Advertise</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    {auth ? (
                        <li><Link onClick={logout} to="/sign-up">Logout</Link></li>
                    ) : (
                        <li><Link to="/sign-in">Sign in</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;