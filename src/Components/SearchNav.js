import React, { useState } from 'react';
import './ComponentsStyling/SearchNav.css';

function Nav({ onSearch, onCategoryChange, onPriceChange }) {
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    onCategoryChange(value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceFilter(value);
    onPriceChange(value);
  };

  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <div className="nav-container">
          <input
            type="text"
            placeholder="Search Product"
            onChange={handleSearchChange}
          />
          <div className="filter-container">
            <label htmlFor="category-filter">Category:</label>
            <select id="category-filter" value={categoryFilter} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
              <option value="furniture">Furniture</option>
              <option value="shoes">Shoes</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="price-filter-container">
            <label htmlFor="price-filter">Price:</label>
            <select id="price-filter" value={priceFilter} onChange={handlePriceChange}>
              <option value="">All Prices</option>
              <option value="under-50">Under $50</option>
              <option value="50-to-100">$50 to $100</option>
              <option value="100-to-150">$100 to $150</option>
              <option value="above-150">Above $150</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
