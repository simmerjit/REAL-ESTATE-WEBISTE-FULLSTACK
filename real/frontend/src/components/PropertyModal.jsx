import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import '../styles/modal.css';
import SketchfabViewer from '../components/SketchfabViewer';
import LeafletMap from '../components/MapComponent';

const PropertyModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locationData = useLocation();
  const isRent = locationData.state?.isRent || false;

  const [property, setProperty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [location, setLocation] = useState({ lat: 34.0522, lng: -118.2437 });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const endpoint = isRent
          ? `https://real-estate-webiste-fullstack.onrender.com/api/rents/${id}`
          : `https://real-estate-webiste-fullstack.onrender.com/api/properties/${id}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        const enhancedProperty = {
          ...data,
          beds: data.beds || 4,
          baths: data.baths || 3,
          sqft: data.sqft || 2850,
          parking: data.parking || 2,
          yearBuilt: data.yearBuilt || 2018,
          propertyType: data.propertyType || 'Single Family Home',
          lotSize: data.lotSize || '0.25 acres',
          hoaFee: data.hoaFee || '$150/month',
          description: data.description || 'Lorem ipsum dolor sit amet...',
          features: data.features || [
            'Hardwood floors throughout',
            'Gourmet kitchen with granite countertops',
            'Master suite with walk-in closet',
            'Private backyard with pool',
            'Two-car garage',
            'Central air conditioning',
            'Fireplace in living room',
            'Stainless steel appliances',
            'Updated bathrooms',
            'Crown molding',
            'Recessed lighting',
            'Energy-efficient windows'
          ],
          listingAgent: data.listingAgent || {
            name: 'Sarah Johnson',
            phone: '(555) 123-4567',
            email: 'sarah.johnson@realty.com',
            photo: 'https://images.unsplash.com/photo-1494790108755-2616b95d4f43?w=150&h=150&fit=crop&crop=face'
          },
          neighborhood: data.neighborhood || {
            walkScore: 82,
            transitScore: 65,
            bikeScore: 71,
            schools: [
              { name: 'Sunset Elementary', rating: 9, distance: '0.3 miles' },
              { name: 'Beverly Hills High', rating: 8, distance: '1.2 miles' }
            ]
          }
        };

        setProperty(enhancedProperty);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id, isRent]);

  const closeModal = () => navigate(isRent ? '/rent' : '/buy');

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  if (!property) return null;

  const pricePerSqft = property.price
    ? Math.round(parseInt(property.price.replace(/[$,]/g, '')) / property.sqft)
    : 0;

  return (
    <div className="modal-overlay animate__animated animate__fadeIn" onClick={closeModal}>
      <div
        className="modal-container zillow-style animate__animated animate__zoomIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="close-btn" onClick={closeModal}>×</button>
          <div className="header-actions">
            <button
              className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              ♥
            </button>
            <button className="share-btn">⤴</button>
          </div>
        </div>

        <div className="modal-content">
          <div className="image-section">
            <div className="main-image-container">
              <img
                src={property.images[currentIndex]}
                alt={property.title}
                className="main-image animate__animated animate__fadeIn"
              />
              <button className="nav-btn prev-btn" onClick={handlePrev}>‹</button>
              <button className="nav-btn next-btn" onClick={handleNext}>›</button>
              <div className="image-counter">
                {currentIndex + 1} / {property.images.length}
              </div>
            </div>
            <div className="thumbnail-strip">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`View ${index + 1}`}
                  className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="details-section">
            <div className="price-section">
              <h1 className="price">{property.price}</h1>
              <div className="property-stats">
                <span className="stat"><strong>{property.beds}</strong> beds</span>
                <span className="stat"><strong>{property.baths}</strong> baths</span>
                <span className="stat"><strong>{property.sqft?.toLocaleString()}</strong> sqft</span>
                <span className="stat"><strong>${pricePerSqft}</strong>/sqft</span>
              </div>
              <div className="address">
                <span className="address-text">{property.address}</span>
              </div>
            </div>

            <div className="tabs">
              <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={`tab ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Details</button>
              <button className={`tab ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>Map</button>
              <button className={`tab ${activeTab === 'tour' ? 'active' : ''}`} onClick={() => setActiveTab('tour')}>3D Tour</button>
            </div>

            <div
              key={activeTab}
              className="tab-content animate__animated animate__fadeIn"
            >
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <div className="description">
                    <h3>Property Description</h3>
                    <p>{property.description}</p>
                  </div>
                  <div className="features">
                    <h3>Features</h3>
                    <div className="features-grid">
                      {property.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <span className="bullet">•</span> {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="details-content">
                  <div className="property-details-grid">
                    <div className="detail-item"><span className="label">Year Built</span><span className="value">{property.yearBuilt}</span></div>
                    <div className="detail-item"><span className="label">Property Type</span><span className="value">{property.propertyType}</span></div>
                    <div className="detail-item"><span className="label">Lot Size</span><span className="value">{property.lotSize}</span></div>
                    <div className="detail-item"><span className="label">HOA Fee</span><span className="value">{property.hoaFee}</span></div>
                    <div className="detail-item"><span className="label">Parking</span><span className="value">{property.parking} spaces</span></div>
                  </div>

                  <div className="neighborhood-scores">
                    <h3>Neighborhood Scores</h3>
                    <div className="score-item">
                      <div className="score-label">Walk</div>
                      <div className="score-bar"><div className="score-fill walk-score" style={{ width: `${property.neighborhood.walkScore}%` }} /></div>
                      <div className="score-value">{property.neighborhood.walkScore}</div>
                    </div>
                    <div className="score-item">
                      <div className="score-label">Transit</div>
                      <div className="score-bar"><div className="score-fill transit-score" style={{ width: `${property.neighborhood.transitScore}%` }} /></div>
                      <div className="score-value">{property.neighborhood.transitScore}</div>
                    </div>
                    <div className="score-item">
                      <div className="score-label">Bike</div>
                      <div className="score-bar"><div className="score-fill bike-score" style={{ width: `${property.neighborhood.bikeScore}%` }} /></div>
                      <div className="score-value">{property.neighborhood.bikeScore}</div>
                    </div>
                  </div>

                  <div className="schools">
                    <h3>Nearby Schools</h3>
                    {property.neighborhood.schools.map((school, index) => (
                      <div key={index} className="school-item">
                        <div className="school-info">
                          <span className="school-name">{school.name}</span>
                          <span className="school-distance">{school.distance}</span>
                        </div>
                        <span className="school-rating">{school.rating}/10</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="map-content">
                  <LeafletMap location={location} />
                </div>
              )}

              {activeTab === 'tour' && (
                <div className="map-content">
                  <SketchfabViewer modelId="35c6623880304df1adb10177a31dcc21" />
                </div>
              )}
            </div>

            <div className="contact-section">
              <div className="agent-info">
                <img src={property.listingAgent.photo} alt={property.listingAgent.name} className="agent-photo" />
                <div className="agent-details">
                  <h4>{property.listingAgent.name}</h4>
                  <p>{property.listingAgent.phone}</p>
                  <p>{property.listingAgent.email}</p>
                </div>
              </div>
              <div className="contact-buttons">
                <button className="contact-btn primary">Contact Agent</button>
                <button className="contact-btn secondary">Schedule Tour</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
