import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import LeafletMap from '../components/MapComponent';
import Propertycard from '../components/Propertycard';
import PriceDropdown from '../components/PriceDropdown';
import '../styles/buy.css';
import 'animate.css';

const Buy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState({ lat: 34.0522, lng: -118.2437 });
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState({
    minPrice: '',
    maxPrice: '',
    sortOrder: '',
  });

  const locationHook = useLocation();
  const navigate = useNavigate();

  // Update category based on route
  useEffect(() => {
    const path = locationHook.pathname.replace('/', '');
    if (['buy', 'rent', 'sold'].includes(path)) {
      setCategory(path);
    }
  }, [locationHook.pathname]);

  // Fetch properties based on search query
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:4000/api/properties?search=${searchQuery}`
        );
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        const filtered = data.filter((property) =>
          property.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProperties(filtered);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchQuery]);

  // Load all properties on mount if no search query
  useEffect(() => {
    if (searchQuery.trim()) return;

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

  // Handle search and geocode lookup
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const encoded = encodeURIComponent(searchQuery);
      const res = await axios.get(`/api/geocode?q=${encoded}`);

      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Something went wrong while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort properties based on price filter
const getFilteredProperties = () => {
  let filtered = [...properties];

  filtered = filtered.filter((p) => {
    const cleanPrice = Number(
      String(p.price).replace(/[^0-9.-]+/g, '') // remove $ , etc.
    );

    if (priceFilter.minPrice && cleanPrice < Number(priceFilter.minPrice)) {
      return false;
    }
    if (priceFilter.maxPrice && cleanPrice > Number(priceFilter.maxPrice)) {
      return false;
    }
    p.cleanPrice = cleanPrice; // for sorting
    return true;
  });

  if (priceFilter.sortOrder === 'low-high') {
    filtered.sort((a, b) => a.cleanPrice - b.cleanPrice);
  } else if (priceFilter.sortOrder === 'high-low') {
    filtered.sort((a, b) => b.cleanPrice - a.cleanPrice);
  }

  return filtered;
};

  const filteredProperties = getFilteredProperties();

  return (
    <>
      <div className="search-nav animate__animated animate__fadeInDown">
        <div className="search-bar animate__animated animate__fadeInLeft">
          <input
            type="text"
            placeholder="Search within Los Angeles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>

        <div className="filters animate__animated animate__fadeInRight">
          <PriceDropdown onFilterChange={setPriceFilter} />
          <select
            id="category"
            value={category}
            onChange={(e) => {
              const selected = e.target.value;
              setCategory(selected);
              navigate(`/${selected}`);
            }}
          >
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div className="search-page animate__animated animate__fadeInUp">
        <div className="map-container animate__animated animate__zoomIn">
          <LeafletMap location={location} />
        </div>

        <div className="properties-grid">
          {loading ? (
            <p>Loading properties...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Propertycard key={property._id} property={property} isRent={false} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Buy;
