import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate("/signup")
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <div className='navbar animate__animated animate__fadeInDown'>
            {/* Mobile hamburger button */}
            <button 
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Left navigation */}
            <div className={`nav-left`}>
                <ul className='nav-item'>
                    <li><Link to="/buy">Buy</Link></li>
                    <li><Link to="/rent">Rent</Link></li>
                    <li><Link to="/sell">Sell</Link></li>
                    <li><Link to="/mortgage">Get a mortgage</Link></li>
                    <li><Link to="/agent">Find an Agent</Link></li>
                </ul>
            </div>

            {/* Logo - always visible */}
            <div className='nav-logo'>
                <Link to="/">
                    <img
                        src="https://www.zillowstatic.com/s3/pfs/static/z-logo-default-visual-refresh.svg"
                        alt="zillow logo"
                    />
                </Link>
            </div>

            {/* Right navigation */}
            <div className={`nav-right`}>
                <ul className='nav-item'>
                    <li><Link to="/rentals">Manage Rentals</Link></li>
                    <li><Link to="/advertise">Advertise</Link></li>
                    <li><Link to="/help">Help</Link></li>

                    {auth ? (
                        <li>
                            <Link 
                                onClick={logout} 
                                to="/sign-up"
                                className="auth-link"
                            >
                                Logout
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link 
                                to="/sign-in" 
                                className="auth-link sign-in-btn"
                            >
                                Sign in
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile menu - single hamburger navigation */}
            <div className={`mobile-menu ${isOpen ? 'mobile-open' : ''}`}>
                <ul className='mobile-nav-item'>
                    <li><Link to="/buy" onClick={closeMenu}>Buy</Link></li>
                    <li><Link to="/rent" onClick={closeMenu}>Rent</Link></li>
                    <li><Link to="/sell" onClick={closeMenu}>Sell</Link></li>
                    <li><Link to="/mortgage" onClick={closeMenu}>Get a mortgage</Link></li>
                    <li><Link to="/agent" onClick={closeMenu}>Find an Agent</Link></li>
                    <li><Link to="/rentals" onClick={closeMenu}>Manage Rentals</Link></li>
                    <li><Link to="/advertise" onClick={closeMenu}>Advertise</Link></li>
                    <li><Link to="/help" onClick={closeMenu}>Help</Link></li>

                    {auth ? (
                        <li>
                            <Link 
                                onClick={() => {logout(); closeMenu();}} 
                                to="/sign-up"
                                className="mobile-auth-link"
                            >
                                Logout
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link 
                                to="/sign-in" 
                                onClick={closeMenu}
                                className="mobile-auth-link mobile-sign-in-btn"
                            >
                                Sign in
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile overlay */}
            {isOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
        </div>
    )
}

export default Nav
