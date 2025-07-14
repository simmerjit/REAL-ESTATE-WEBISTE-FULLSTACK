import React, { useState, useEffect } from 'react';
import signimg from '../images/signimg.png';
import '../styles/Signup.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleregister = async () => {
    try {
      const response = await fetch('https://real-estate-webiste-fullstack.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/");
    } catch (error) {
      console.error('❌ Registration error:', error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className='signpage animate__animated animate__fadeIn'>
      <div className="signin animate__animated animate__fadeInLeft">
        <div className='signinhead'>
          <img
            src="https://www.zillowstatic.com/s3/pfs/static/z-logo-default-visual-refresh.svg"
            alt="zillow logo"
          />
          <h2>Sign up</h2>
        </div>

        <div className='signinput'>
          <input
            type="email"
            className='signinput1'
            placeholder='Email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            className='signinput1'
            placeholder='Password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className='signinputbtn' onClick={handleregister}>Continue</button>
          <p>Already have an account? <a href="/sign-in">Sign in</a></p>
        </div>

        <div className='signinput animate__animated animate__fadeInUp animate__delay-1s'>
          <button className='social-btn google-btn'>Sign up with Google</button>
          <button className='social-btn facebook-btn'>Sign up with Facebook</button>
          <button className='social-btn apple-btn'>Sign up with Apple</button>
        </div>
      </div>

      <div className="signimg animate__animated animate__fadeInRight">
        <img src={signimg} alt="family" />
      </div>
    </div>
  );
};

export default Signup;
