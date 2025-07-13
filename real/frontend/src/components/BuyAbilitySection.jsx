import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BuyAbilitySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      badge: "Within BuyAbility"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      badge: "Within BuyAbility"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      badge: "Within BuyAbility"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      badge: "Within BuyAbility"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      badge: "Within BuyAbility"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      badge: "Within BuyAbility"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, properties.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, properties.length - 2)) % Math.max(1, properties.length - 2));
  };

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>
            Find homes you can afford with BuyAbility<sup style={{ fontSize: '0.8rem' }}>SM</sup>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Answer a few questions. We'll highlight homes you're likely to qualify for.
          </p>
        </div>

        {/* Main Content - Flex Row */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left side - Zillow Home Loans card */}
          <div style={{ flex: '0 0 350px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              border: '1px solid #e0e0e0', 
              borderRadius: '12px', 
              padding: '32px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  backgroundColor: '#006aff', 
                  borderRadius: '4px', 
                  marginRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Z</span>
                </div>
                <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '16px' }}>Zillow Home Loans</span>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>$ --</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Suggested target price</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>$ --</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>BuyAbility<sup style={{ fontSize: '10px' }}>SM</sup></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>$ --</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Mo. payment</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>-- %</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Today's rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a' }}>-- %</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>APR</div>
                  </div>
                </div>
              </div>
              
              <button style={{ 
                width: '100%', 
                backgroundColor: '#006aff', 
                color: 'white', 
                padding: '16px 24px', 
                borderRadius: '8px', 
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056d6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#006aff'}
              >
                Let's get started
              </button>
            </div>
          </div>

          {/* Right side - Property cards */}
          <div style={{ flex: '1', position: 'relative' }}>
            
            {/* Navigation controls */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px' 
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {Array.from({ length: Math.max(1, properties.length - 2) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: i === currentIndex ? '#006aff' : '#ccc',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={prevSlide}
                  style={{
                    padding: '8px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    padding: '8px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Property cards container */}
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  transition: 'transform 0.3s ease-in-out',
                  transform: `translateX(-${currentIndex * 33.333}%)`
                }}
              >
                {properties.map((property) => (
                  <div key={property.id} style={{ 
                    width: '33.333%', 
                    flexShrink: 0, 
                    padding: '0 8px' 
                  }}>
                    <div style={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '12px', 
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'box-shadow 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={property.image}
                          alt="Property"
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                          <span style={{ 
                            backgroundColor: '#ff6b35', 
                            color: 'white', 
                            padding: '6px 12px', 
                            borderRadius: '20px', 
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            {property.badge}
                          </span>
                        </div>
                      </div>
                      <div style={{ padding: '16px' }}>
                        <div style={{ 
                          height: '16px', 
                          backgroundColor: '#e0e0e0', 
                          borderRadius: '4px', 
                          marginBottom: '8px' 
                        }}></div>
                        <div style={{ 
                          height: '12px', 
                          backgroundColor: '#e0e0e0', 
                          borderRadius: '4px', 
                          width: '75%', 
                          marginBottom: '8px' 
                        }}></div>
                        <div style={{ 
                          height: '12px', 
                          backgroundColor: '#e0e0e0', 
                          borderRadius: '4px', 
                          width: '50%' 
                        }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyAbilitySection;