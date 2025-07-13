import React, { useState, useRef, useEffect } from 'react';
import searchimg from '../images/searchimg.png';
import '../styles/home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuyAbilitySection from '../components/BuyAbilitySection';
import Cards from '../components/Cards';
import 'animate.css';
import Propertycard from '../components/Propertycard';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    const encoded = encodeURIComponent(searchQuery);

    try {
      const res = await axios.get(`/api/geocode?q=${encoded}`);
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        const loc = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setLocation(loc);
        navigate('/search', { state: { location: loc, searchText: searchQuery } });
      } else {
        alert("No results found. Try a different address.");
        setLocation(null);
        setSearchQuery('');
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sign = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    const fetchAllProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:4000/api/properties');
        if (!response.ok) throw new Error('Failed to fetch all properties');
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error('Error loading all properties:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className='home-1'>

          {/* Hero Background */}
          <div className="background">
            <img src={searchimg} alt="Search" className="animate__animated animate__fadeIn" />
            <div className="head animate__animated animate__fadeInDown">
              <h2 className="head-search animate__animated animate__fadeInLeft">
                Agents. Tours.<br />Loans. Homes.
              </h2>
              <div className="head-search-bar animate__animated animate__fadeInUp">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder='Search within Los Angeles'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                  {loading ? '...' : '🔍'}
                </button>
              </div>
            </div>
          </div>

          {/* Properties or Recommendation Section */}
          <div className='content-1 animate__animated animate__fadeInUp'>
            {auth ? (
              <div className="property-list-horizontal">
                {properties.length > 0 ? (
                  properties.slice(0, 4).map((p) => (
                    <Propertycard key={p._id} property={p} />
                  ))
                ) : (
                  <p>No properties found.</p>
                )}
              </div>
            ) : (
              <div className="recommendation-section">
                <div className="recommendation-text">
                  <h2>Get home recommendations</h2>
                  <p>Sign in for a more personalized experience.</p>
                  <button onClick={sign}>Sign in</button>
                </div>
                <div className="recommendation-image">
                  <img
                    src="https://www.zillowstatic.com/s3/web-platform/sub-apps/hops-homepage/hops-homepage.prod.master.9954683.4440c378/web/1d9d5bce566c85fa242cb21ad3292cb8.webp"
                    alt="Home recommendation visual"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {error}
            </div>
          )}

          {/* Other Sections */}
          <div className="animate__animated animate__fadeInUp">
            <BuyAbilitySection />
          </div>

          <div className="animate__animated animate__fadeIn">
            <Cards />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
