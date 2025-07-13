import React from 'react';
import '../styles/Rentals.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const Rentals = () => {
  const navigate = useNavigate();

  return (
    <div className="rentals-page">
      <div className="app">

        {/* Hero Section */}
        <section className="hero animate__animated animate__fadeInUp">
          <div className="hero-content">
            <h2 className="animate__animated animate__fadeInLeft">Level up your landlording simply and confidently</h2>
            <p className="animate__animated animate__fadeInLeft animate__delay-1s">
              Set your price and attract tenants, simplify the rent process, and take the guesswork out of property management.
            </p>
            <div className="hero-buttons animate__animated animate__fadeInUp animate__delay-2s">
              <button onClick={() => navigate('/upload')}>Price your rental</button>
              <button className="outline">Sign up for free</button>
            </div>
            <p className="signin-link">Already have an account? <a href="#">Sign in</a></p>
          </div>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtDKXo7jwWZUWDpyllMxiuutQSVTgVyBD_g&s" 
            alt="Hero" 
            className="hero-img animate__animated animate__fadeInRight" 
          />
        </section>

        {/* Rent Like a Pro */}
        <section className="rent-pro animate__animated animate__fadeIn">
          <h3>Rent like a pro with Rental Manager</h3>
          <p>Save time with free tools for finding tenants, screening, and collecting rent online — all in one place.</p>
          <div className="cards">
            {[
              {
                img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/51/2025/04/%F0%9F%96%A5-Search.png',
                title: 'Post listings to Zillow and partners',
                desc: 'Reach potential renters by syndicating your listing to Zillow, Trulia, and HotPads.'
              },
              {
                img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/10/2025/04/%F0%9F%96%A5-File.png',
                title: 'Create a lease and collect rent online',
                desc: 'Customize a lease and let tenants pay rent and deposits securely online.'
              },
              {
                img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/10/2025/04/%F0%9F%96%A5-Tag.png',
                title: 'Screen applicants efficiently',
                desc: 'Run background checks, credit reports, and more.'
              },
              {
                img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/10/2025/04/%F0%9F%96%A5-HouseTime.png',
                title: 'Get access to tools',
                desc: 'Track income, expenses, and documents all in one place.'
              },
              {
                img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/10/2025/04/%F0%9F%96%A5-Piggy-1.png',
                title: 'Request rent payments',
                desc: 'Set up auto-pay, reminders, and track on-time payments.'
              }
            ].map((card, i) => (
              <div key={i} className={`card animate__animated animate__fadeInUp animate__delay-${i}s`}>
                <img src={card.img} alt={card.title} />
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
                <a href="#">Learn more</a>
              </div>
            ))}
          </div>
        </section>

        {/* Guesswork Section */}
        <section className="guesswork animate__animated animate__fadeInLeft">
          <h3>Take the guesswork out of managing your business</h3>
          <img 
            src="https://delivery.digitalassets.zillowgroup.com/api/public/content/price-your-rental2x_CMS_Full.png?v=31c9be4f" 
            alt="Price your rental" 
          />
          <button>Price your rental</button>
        </section>

        {/* Testimonials */}
        <section className="testimonials animate__animated animate__fadeInRight">
          <h3>Here’s what the pros are saying</h3>
          <p>“Zillow simplifies the whole rental process from leasing, to collecting rent, and payments.”</p>
          <p>- John M.</p>
        </section>

        {/* Premium Section */}
        <section className="premium animate__animated animate__fadeInUp">
          <img 
            src="https://delivery.digitalassets.zillowgroup.com/api/public/content/premium2x_CMS_Full.png?v=1010307e" 
            alt="Premium Tools" 
          />
          <div>
            <h4>All-in-one lease with Premium</h4>
            <ul>
              <li>State-specific lease agreements</li>
              <li>Payment reminders</li>
              <li>Online payments and auto-pay</li>
              <li>Tracking and documentation</li>
            </ul>
            <button>Upgrade to Premium</button>
          </div>
        </section>

        {/* Confidence Section */}
        <section className="confidence animate__animated animate__fadeInUp">
          <h3>Renting you can feel confident about</h3>
          <p>Start your rental journey confidently with tools that make landlording simpler.</p>
          <button>Start now</button>
        </section>

        {/* App Section */}
        <section className="app-download animate__animated animate__zoomIn">
          <img 
            src="https://delivery.digitalassets.zillowgroup.com/api/public/content/app-download2x_CMS_Full.png?v=eab55174" 
            alt="App Download" 
          />
          <p>Scan the QR code to get the Zillow Rental Manager App</p>
        </section>

        {/* Resources Section */}
        <section className="resources animate__animated animate__fadeInUp">
          <h4>Property management resources</h4>
          <div className="cards">
            {['Rental Management Guide', 'App Features', 'Lease Tips'].map((title, i) => (
              <div key={i} className={`card animate__animated animate__fadeIn animate__delay-${i}s`}>
                <h5>{title}</h5>
                <a href="#">Learn more</a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Rentals;
