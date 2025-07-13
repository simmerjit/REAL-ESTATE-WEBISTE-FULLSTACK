import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeafletMap from '../components/MapComponent';
import Propertycard from '../components/Propertycard';
import '../styles/search.css';
import axios from 'axios';
import PriceDropdown from "../components/PriceDropdown";


const Search = () => {
  const locationData = useLocation();
  const locationState = locationData?.state || {};
  const { location, searchText } = locationState;
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [geoLocation, setGeoLocation] = useState(location);



 



  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    const encoded = encodeURIComponent(searchInput);

    try {
      const res = await axios.get(`https://real-estate-webiste-fullstack.onrender.com/api/geocode?q=${encoded}`);

      if (res.data.length > 0) {
        console.log('Geocode API Response:', res.data);
        const { lat, lon } = res.data[0];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);
        const loc = { lat: parsedLat, lng: parsedLon };
        setGeoLocation(loc);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Something went wrong while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText || !location) {
      console.warn('Missing searchText or location');
      return;
    }

    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://real-estate-webiste-fullstack.onrender.com/api/properties?search=${searchText}`);
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();

        const filtered = searchText
          ? data.filter((property) =>
              property.address.toLowerCase().includes(searchText.toLowerCase())
            )
          : data;

        setProperties(filtered.length > 0 ? filtered : data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchText, location]);

  useEffect(() => {
    if (!searchInput) {
      return;
    }

    const fetchProperties2 = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://real-estate-webiste-fullstack.onrender.com/api/properties?search=${searchInput}`);
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();

        const filtered = searchInput
          ? data.filter((property) =>
              property.address.toLowerCase().includes(searchInput.toLowerCase())
            )
          : data;

        setProperties(filtered.length > 0 ? filtered : data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties2();
  }, [searchInput]);
 
  return (
    <>
 <div className="search-nav animate__animated animate__fadeInDown animate__faster">
  <div className="search-bar animate__animated animate__fadeInLeft">
    <input 
      type="text" 
      placeholder="Search within Los Angeles" 
      value={searchInput}  
      onChange={(e) => setSearchInput(e.target.value)} 
    />
    <button onClick={handleSearch}>🔍</button>
  </div>

  <div className="filters animate__animated animate__fadeInRight">
    <PriceDropdown />
    <select name="cate" id="category">
      <option value="buy">For Sale</option>
      <option value="rent">For Rent</option>
      <option value="sold">Sold</option>
    </select>
  </div>
</div>

<div className="search-page animate__animated animate__fadeInUp">
  <div className="map-container animate__animated animate__zoomIn">
    {geoLocation ? (
      <LeafletMap location={geoLocation} />
    ) : (
      <p>No location data found. Please search from home page.</p>
    )}
  </div>
        <div className="properties-grid">
          {loading ? (
            <p>Loading properties...</p>
          ) : error ? (
            <p>{error}</p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <Propertycard key={property._id} property={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}

          
        </div>
      </div>
    </>
  );
};

export default Search;
