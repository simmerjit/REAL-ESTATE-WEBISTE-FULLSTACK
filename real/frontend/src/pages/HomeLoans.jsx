import React from 'react';
import '../styles/HomeLoans.css';
import 'animate.css';

const HomeLoans = () => {
  return (
    <div className="home-loans font-sans text-gray-800">
      {/* Hero Section */}
      <div className="hero-section animate__animated animate__fadeInDown">
        <div className="hero-text">
          <div className="badge animate__animated animate__fadeInLeft">Zillow Home Loans</div>
          <h1 className="headline animate__animated animate__fadeInUp animate__delay-1s">Get the loan that gets you home</h1>
          <p className="description animate__animated animate__fadeInUp animate__delay-2s">
            We offer mortgage loans with no hidden fees and guidance at every step. Start now by seeing what you can afford.
          </p>
          <button className="cta-button animate__animated animate__zoomIn animate__delay-3s">Get pre-qualified</button>
          <p className="dashboard-link animate__animated animate__fadeIn animate__delay-4s">
            Already working with us? <a href="#">Access your dashboard</a>
          </p>
        </div>
        <div className="hero-image animate__animated animate__fadeInRight animate__delay-1s">
          <img
            src="https://www.zillowstatic.com/bedrock/app/uploads/sites/48/2024/06/zhl-hero-img-lg%402x-1.jpg"
            alt="Hero"
          />
        </div>
      </div>

      {/* Q&A Banner */}
      <div className="qa-banner animate__animated animate__pulse animate__delay-2s">
        <p>
          🎥 Got home-buying questions? Get answers in our live Q&A. <a href="#">Register now.</a>
        </p>
      </div>

      {/* Features Section */}
      <div className="features animate__animated animate__fadeInUp animate__delay-1s">
        <h2>Why Zillow Home Loans?</h2>
        <div className="features-grid">
          <div className="feature animate__animated animate__fadeInUp animate__delay-2s">
            <img src="https://www.zillowstatic.com/bedrock/app/uploads/sites/48/2024/06/graph.svg" alt="Competitive rates" />
            <h3>Competitive rates</h3>
            <p>Strong rates, no hidden fees, and total transparency to keep you informed and up to date.</p>
          </div>

          <div className="feature animate__animated animate__fadeInUp animate__delay-3s">
            <img src="https://www.zillowstatic.com/bedrock/app/uploads/sites/48/2024/06/hand-money.svg" alt="Low down payment options" />
            <h3>Low down payment options</h3>
            <p>We offer a variety of loan options to meet your needs and help make home ownership more affordable.</p>
          </div>

          <div className="feature animate__animated animate__fadeInUp animate__delay-4s">
            <img src="https://www.zillowstatic.com/bedrock/app/uploads/sites/48/2024/06/man-paperwork.svg" alt="Top-rated loan officers" />
            <h3>Top-rated loan officers</h3>
            <p>With a 4.8-star average rating, our loan officers provide step-by-step guidance and expertise in first-time home buying.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoans;
