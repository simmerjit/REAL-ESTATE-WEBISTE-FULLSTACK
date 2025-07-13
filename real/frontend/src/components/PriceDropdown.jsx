import React, { useState, useRef, useEffect } from "react";
import "../styles/PriceDropdown.css";

const PriceDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // 'low-high' or 'high-low'

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    onFilterChange({ minPrice, maxPrice, sortOrder });
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Price
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="low-high"
                checked={sortOrder === 'low-high'}
                onChange={() => setSortOrder('low-high')}
              />
              Low-High
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="high-low"
                checked={sortOrder === 'high-low'}
                onChange={() => setSortOrder('high-low')}
              />
              High-Low
            </label>
          </div>
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceDropdown;
