import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link, useParams } from 'react-router-dom';
import '../CssStyling/Products.css';
import { showAlert } from '../Utills/showAlert';

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {category} = useParams();

  const getProductsByCategories = async () => {
    try {
      const apiResponse = await axios.get(`http://localhost:5001/api/products/productsByCategory/${category}`);
      const productsFromApi = apiResponse.data;
  
      /*const cleanedProducts = productsFromApi.map(product => ({
        ...product,
        image: product.images.length > 0 ? product.images[0].replace(/[\[\]"]/g, '') : '',
      }));*/      

      setProducts(productsFromApi);
    } catch (err) {
      console.error('Fetch error:', err);
      showAlert('error', 'Failed to fetch products.');
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getProductsByCategories();  
  }, [category]);


  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-container">
      <div className="products-container">
        <div id="showsContainer">
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <div key={product._id} className="card">
                  <Link to={`/products/${product._id}`}>
                    <img src={product.images[0]} alt={product.title}/>
                    <h3>{product.title}</h3>
                    <div className="details">
                      {product.category && <p className="category">Category: {product.category}</p>}
                      <p className="price">${product.price}</p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
