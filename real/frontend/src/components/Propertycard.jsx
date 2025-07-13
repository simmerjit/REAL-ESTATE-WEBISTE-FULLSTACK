import React from 'react';
import '../styles/propertycard.css';
import { useNavigate } from 'react-router-dom';

const Propertycard = ({ property, isRent = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (property && property._id) {
      navigate(`/property/${property._id}`, {
        state: { isRent },  // 👈 pass this to the modal
      });
    } else {
      console.error('Missing property ID');
    }
  };

  return (
    <div className="property-card" onClick={handleClick}>
      <div className='property-image'>
        <img 
          src={property.imageUrl || property.image || '/default.jpg'} 
          alt="Property" 
        />
      </div>
      <div className='property-details'>
        <h2>{property.title || 'No title'}</h2>
        <p>Location: {property.address || 'No address'}</p>
        <p>Price: {property.price || 'Not specified'}</p>
        <p>Description: {property.description || 'No description'}</p>
      </div>
    </div>
  );
};

export default Propertycard;
