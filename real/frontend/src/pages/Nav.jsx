import React from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import '../styles/nav.css'


const Nav = () => {

    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout =()=> {
        localStorage.clear()
        navigate("/signup")
    }

return (
    <div className='navbar animate__animated animate__fadeInDown'>
        <div className='nav-left animate__animated animate__fadeInLeft'>
            <ul className='nav-item'>
                <li><Link to="/buy">Buy</Link></li>
                <li><Link to="/rent">Rent</Link></li>
                <li><Link to="/sell">Sell</Link></li>
                <li><Link to="/mortgage">Get a mortgage</Link></li>
                <li><Link to="/agent">Find an Agent</Link></li>
            </ul>
        </div>

        <div className='nav-logo animate__animated animate__zoomIn'>
            <Link to="/">
                <img
                    src="https://www.zillowstatic.com/s3/pfs/static/z-logo-default-visual-refresh.svg"
                    alt="zillow logo"
                />
            </Link>
        </div>

        <div className='nav-right animate__animated animate__fadeInRight'>
            <ul className='nav-item'>
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
    </div>
)
}

export default Nav
