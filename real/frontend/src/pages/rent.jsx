import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import LeafletMap from '../components/MapComponent';
import Propertycard from '../components/Propertycard';
import MapComponent from '../components/MapComponent';
import '../styles/rent.css';
import PriceDropdown from '../components/PriceDropdown';
import { useLocation, useNavigate } from 'react-router-dom';

const Rent = () => {
    const [searchQuery, setSearchQuery] = useState('');
        const [location, setLocation] = useState({
      lat: 34.0522,
      lng: -118.2437
    }); 
        const [loading, setLoading] = useState(false);
        const [properties, setProperties] = useState([]);
        const [error, setError] = useState(null);

            const [category, setCategory] = useState("");
        
            const locationHook = useLocation();
            const navigate = useNavigate();
        
        useEffect(() => {
          const path = locationHook.pathname.replace('/', '');
          if (['buy', 'rent', 'sold'].includes(path)) {
            setCategory(path);
          }
        }, [locationHook.pathname]);

        useEffect(()=>{
            if (!searchQuery) {
        
             return;
      }
    const fetchProperties = async () => {
        setLoading(true);
         setError(null);
         try {
            const response = await fetch('http://localhost:4000/rent')
             if (!response.ok) throw new Error('Failed to fetch properties');
             const data= await response.json()
             const filtered = searchQuery ? 
              data.filter((property) =>
                property.address.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : data;
            setProperties(filtered)
            

         } catch (error) {
             console.error('Error fetching properties:', error);
          setError('Something went wrong');
        } finally {
          setLoading(false);
        }
      };
      fetchProperties();
    }, [searchQuery]);


    useEffect(()=>{
       if (searchQuery.trim()) return;

       const fetchAllProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:4000/rent')
                if (!response.ok) throw new Error('Failed to fetch all properties');
                const data = await response.json()
                setProperties(data)
                
            } catch (error) {
                 console.error('Error fetching properties:', error);
            } finally {
      setLoading(false);
    }
  };

  fetchAllProperties();
}, []);
  
        const handlesearch = async () => {

            if (!searchQuery.trim()) return;
            setLoading(true);
            const encoded = encodeURIComponent(searchQuery);
            try {
                const res = await axios.get(`/api/geocode?q=${encoded}`);

                if (res.data.length > 0) {
                    console.log("Geocode API Response:", res.data);
                    const { lat, lon } = res.data[0];
                    const parsedLat = parseFloat(lat);
                    const parsedLon = parseFloat(lon);
                    const loc = {
                        lat: parsedLat,
                        lng: parsedLon
                    };
                    setLocation(loc);
                }
            } catch (error) {
                console.error("Geocoding error:", error);
                alert("Something went wrong while searching. Please try again.");
            } finally {
                setLoading(false); // ✅ Stop loading
            }
        }



        return (
          <>
          <div className="rent-page">
            <div className="search-nav animate__animated animate__fadeInDown">
        <div className="search-bar animate__animated animate__fadeInLeft">
          <input
            type="text"
            placeholder="Search within Los Angeles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handlesearch}>🔍</button>
        </div>

        <div className="filters animate__animated animate__fadeInRight">
          <PriceDropdown />
             <select
        name="cate"
        id="category"
        value={category}
        onChange={(e) => {
          const selected = e.target.value;
          setCategory(selected);
          navigate(`/${selected}`);
        }}>
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="sold">Sold</option>
          </select>
        </div>
            </div>

            <div className="search-page">
        <div className="map-container animate__animated animate__fadeInUp">
          {location ? (
            <LeafletMap location={location} />
          ) : (
            <p className="animate__animated animate__shakeX">No location data found. Please search from home page.</p>
          )}
        </div>

        <div className="properties-grid">
          {loading ? (
            <p>Loading properties...</p>
          ) : error ? (
            <p>{error}</p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
        <div key={property._id}>
          <Propertycard property={property} isRent={true} />
        </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
            </div>

          </div>
          </>
        )
}

export default Rent
