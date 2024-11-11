import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import '../CssStyling/Products.css';  
import { showAlert } from '../Utills/showAlert';

const RecommendedByCategory = ({category, currentProductId}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductsRecommendeds = async () => {
    try {
      const apiResponse = await axios.get(`http://localhost:5001/api/products/productsByCategory/${category}`);
      const productsFromApi = apiResponse.data; 

      const filteredProducts = productsFromApi.filter(product => product._id !== currentProductId);
      const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
      const randomFiveProducts = shuffledProducts.slice(0, 4);

      setProducts(randomFiveProducts);
    } catch (err) {
      console.error('Fetch error:', err);
      showAlert('error', 'Failed to fetch products.');
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getProductsRecommendeds();  
  }, [category]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">You Might Also Like These:</h1>
      <div className="row">
        {products.length > 0 ? products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <Link to={`/products/${product._id}`} className="text-decoration-none text-dark">
                <img src={product.images[0]} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </Link>
            </div>
          </div>
        )) : (
          <p className="text-center w-100">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedByCategory;
