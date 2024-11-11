import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CssStyling/Products.css';
import Nav from '../Components/SearchNav';
import { showAlert } from '../Utills/showAlert';
import ProductsByCategoriesList from '../Components/ProductsByCategoriesList';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndUpdateProducts = async () => {
    setIsLoading(true);
    if (localStorage.getItem('dataImported') !== 'true') {
      try {
        const apiResponse = await axios.get('https://dummyjson.com/products?limit=1000');
        const productsFromApi = apiResponse.data.products;

        const cleanedProducts = productsFromApi.map(product => ({
          ...product,
          images: product.images.map(image => image.replace(/[\[\]"]/g, ''))
        }));

        await axios.post('http://localhost:5001/api/products/import', cleanedProducts);
        localStorage.setItem('dataImported', 'true');
      } catch (err) {
        console.error('Fetch error:', err);
        showAlert('error', 'Failed to fetch and import products.');
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
        return;
      }
    } else {
      console.log('Data already imported. Fetching existing products...');
    }
    try {
      const productsResponse = await axios.get('http://localhost:5001/api/products');
      setProducts(productsResponse.data);
    } catch (err) {
      console.error('Fetch error:', err);
      showAlert('error', 'Failed to fetch existing products.');
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndUpdateProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (priceFilter) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        switch (priceFilter) {
          case "under-50":
            return price < 50;
          case "50-to-100":
            return price >= 50 && price < 100;
          case "100-to-150":
            return price >= 100 && price < 150;
          case "above-150":
            return price >= 150;
          default:
            return true;
        }
      });
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceFilter, products]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-container">
      <div className="search-container">
        <Nav
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceFilter}
        />
      </div>
      <h4>Explore Popular Categories</h4>
      <ProductsByCategoriesList />
      <div className="products-container">
        <div id="showsContainer">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/products/${product._id}`} className="card">
                <div className="product-images">
                  <img src={product.images[0]} alt={`${product.title}`} />
                </div>
                <h3>{product.title}</h3>
                <div className="details">
                  {product.category && <p className="category">Category: {product.category}</p>}
                  <p className="price">${product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
