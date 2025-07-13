import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signimg from '../images/signimg.png';
import '../styles/Signup.css';
import 'animate.css';

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handlelogin = async () => {
    let result = await fetch("https://real-estate-webiste-fullstack.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    result = await result.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result));
      alert("Login successful");
      navigate("/");
    } else {
      alert("Please enter valid details");
    }
  };

  return (
    <div className='signpage'>
      <div className="signin animate__animated animate__fadeInLeft">
        <div className='signinhead'>
          <img src="https://www.zillowstatic.com/s3/pfs/static/z-logo-default-visual-refresh.svg" alt="zillow logo" />
          <h2>Sign in</h2>
        </div>
        <div className='signinput'>
          <input
            type="text"
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
          <button className='signinputbtn' onClick={handlelogin}>Continue</button>
          <p>New to Zillow?<a href="/sign-up"> Create Account</a></p>
        </div>
        <div className='signinput signinput-social'>
          <button>Google</button>
          <button>Facebook</button>
          <button>Apple</button>
        </div>
      </div>

      <div className="signimg animate__animated animate__fadeInRight">
        <img src={signimg} alt="family" />
      </div>
    </div>
  );
};

export default Signin;
