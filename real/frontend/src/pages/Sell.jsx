import React from 'react';
import '../styles/Sell.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';


const Sell = () => {
const navigate = useNavigate();

  return (
    <div className="sell-home-wrapper">

      {/* Hero Section */}
      <section className="hero animate__animated animate__fadeInUp">
        <div className="hero-text">
          <h1 className="animate__animated animate__fadeInLeft">Sell your home with confidence</h1>
          <p className="animate__animated animate__fadeInLeft animate__delay-1s">
            We give you multiple options to sell your home with the flexibility
            to choose what works best for your unique situation, timeline and goals.
          </p>
          <button className="cta-button animate__animated animate__bounceIn animate__delay-2s">
            <span>↓</span> Explore your options
          </button>
        </div>
        <div className="hero-image animate__animated animate__fadeInRight">
          <img 
            src="https://delivery.digitalassets.zillowgroup.com/api/public/content/HeroImage2x_CMS_Large.png?v=faa40f41" 
            alt="Sell Home Hero" 
          />
        </div>
      </section>

      {/* Partner Agent Section */}
      <section className="partner-agent animate__animated animate__fadeIn">
        <div className="partner-agent-content">
          <h2 className="animate__animated animate__fadeInUp">Sell with a <span className="green-highlight">Zillow partner agent</span></h2>

          <div className="agent-cards">
            <div className="agent-card animate__animated animate__zoomIn">
              <img 
                src="https://delivery.digitalassets.zillowgroup.com/api/public/content/Sell-for-more-Illustration2x_CMS_Large.png?v=9dc1d40b" 
                alt="Sell for more" 
              />
              <h3>Sell for more with Showcase</h3>
              <p>
                Select partner agents offer <a href="#">Showcase</a> — a premium listing experience with 3D tours
                and interactive floor plans — at no extra cost. Showcase listings sell for $7K more on average.
              </p>
            </div>

            <div className="agent-card animate__animated animate__zoomIn ">
              <img 
                src="https://delivery.digitalassets.zillowgroup.com/api/public/content/Maximize-your-homeIllustration2x_CMS_Large.png?v=6a1f4b96" 
                alt="Maximize visibility" 
              />
              <h3>Maximize your home's visibility</h3>
              <p>
                Zillow helps you <a href="#">sell your home</a> with partner agents to reach the largest audience
                of buyers through public listings.
              </p>
            </div>
          </div>

          <p className="partner-note animate__animated animate__fadeInUp animate__delay-2s">
            Answer a few questions to connect with a Zillow partner agent who offers Showcase or explore other selling options — all in 3 minutes with no commitment.
          </p>

          <button className="cta-button-secondary animate__animated animate__bounceIn animate__delay-3s"   onClick={() => navigate('/upload')}>Get started</button>
        </div>
      </section>

      {/* Selling Options Section */}
      <section className="selling-options animate__animated animate__fadeInUp">
        <div className="selling-options-content">
          <div className="selling-options-header">
            <h2>Explore more selling options</h2>
            <p>Sell your home your way. Choose the path that fits your needs.</p>
          </div>

          <div className="option-cards">
            <div className="option-card animate__animated animate__fadeInLeft">
              <div className="option-text">
                <h3>Get a <span className="highlight">cash offer</span></h3>
                <ul>
                  <li><span className="checkmark">✔</span> Get an all-cash offer to sell your home quickly.</li>
                  <li><span className="checkmark">✔</span> Skip the hassle of showings, listings, and repairs.</li>
                  <li><span className="checkmark">✔</span> Choose your own closing date with no obligation.</li>
                </ul>
                <button>Get a cash offer →</button>
              </div>
              <div className="option-image cash">
                <div className="icon">💰</div>
              </div>
            </div>

            <div className="option-card reverse animate__animated animate__fadeInRight animate__delay-1s">
              <div className="option-text">
                <h3>Find your <span className="highlight">own agent</span></h3>
                <ul>
                  <li><span className="checkmark">✔</span> Discover local pros with trusted reviews.</li>
                  <li><span className="checkmark">✔</span> Match with agents who understand your needs.</li>
                </ul>
                <button>Find agents near you →</button>
              </div>
              <div className="option-image agent">
                <div className="icon">🏘️</div>
              </div>
            </div>

            <div className="option-card animate__animated animate__fadeInLeft animate__delay-2s">
              <div className="option-text">
                <h3>Sell your home <span className="highlight">yourself</span></h3>
                <ul>
                  <li><span className="checkmark">✔</span> Reach more buyers with For Sale By Owner listings.</li>
                  <li><span className="checkmark">✔</span> Manage everything and save on commission.</li>
                </ul>
                <button>List your home on Zillow →</button>
              </div>
              <div className="option-image yourself">
                <div className="icon">🏠</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources animate__animated animate__fadeIn">
        <div className="resources-content">
          <div className="resources-header">
            <h2>Go-to resources for a successful sale</h2>
            <p>Get practical guides and strategies for every step of your selling process.</p>
          </div>

          <div className="resource-cards">
            <div className="resource-card animate__animated animate__zoomIn">
              <img 
                src="https://delivery.digitalassets.zillowgroup.com/api/public/content/Module6_14-Tips-Article-Image2x_CMS_Medium_Large.png?v=1c387c71" 
                alt="14 tips for selling" 
              />
              <div className="resource-text">
                <span className="read-time">8 min read</span>
                <h4>14 tips for selling your home fast and for more money</h4>
                <a href="#">Read article</a>
              </div>
            </div>

            <div className="resource-card animate__animated animate__zoomIn animate__delay-1s">
              <img 
                src="https://delivery.digitalassets.zillowgroup.com/api/public/content/Module6_Choose-Agent-Image2x_CMS_Medium_Large.png?v=941acad3" 
                alt="Choose real estate agent" 
              />
              <div className="resource-text">
                <span className="read-time">6 min read</span>
                <h4>How to choose the right real estate agent</h4>
                <a href="#">Read article</a>
              </div>
            </div>

            <div className="resource-card animate__animated animate__zoomIn animate__delay-2s">
              <img 
                src="https://delivery.digitalassets.zillowgroup.com/api/public/content/Module6_Steps-Selling-Image2x_CMS_Medium_Large.png?v=50638c26" 
                alt="Steps to selling house" 
              />
              <div className="resource-text">
                <span className="read-time">15 min read</span>
                <h4>Steps to selling a house</h4>
                <a href="#">Read article</a>
              </div>
            </div>

            <div className="resource-card animate__animated animate__zoomIn animate__delay-3s">
              <img 
                src="https://delivery.digitalassets.zillowgroup.com/api/public/content/Module6_Best-Time-Image2x_CMS_Medium_Large.png?v=4d052836" 
                alt="Best time to sell house" 
              />
              <div className="resource-text">
                <span className="read-time">7 min read</span>
                <h4>When is the best time to sell a house?</h4>
                <a href="#">Read article</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sell;
