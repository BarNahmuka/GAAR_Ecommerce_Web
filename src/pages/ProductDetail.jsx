import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CssStyling/ProductDetail.css';
import {showAlert} from '../Utills/showAlert';
import RecommendedByCategory from '../Components/RecommendedByCategory'; 

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
        if (response.status === 200) {
          const data = response.data;
          const imagesArray = Array.isArray(data.images) ? data.images : [data.images];
          setProduct({
            ...data,
            images: imagesArray,
          });
          setProductImage(imagesArray[0]);
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
        showAlert('error','Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!userId || !product) return;

    try {
      const response = await axios.patch(`http://localhost:5001/api/users/${userId}`, {
        $push: {
          myCart: {
            product_title: product.title,
            product_price: product.price,
            product_images: product.images
          }
        }
      });

      if (response.status === 200) {
        showAlert('success','Product added to cart!');
        const updatedCart = [...cartItems, { ...product, quantity: 1 }];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        console.error('Failed to add product to cart:', response.statusText);
        showAlert('error','An error occurred while adding to cart. Please try again.');
      }
    } catch (error) {
      console.error('Add to cart error:', error.message);
      showAlert('error','An error occurred while adding to cart. Please try again.');
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:5001/api/products`, {
        params: { title: product.title }
      });

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/products", { state: { refresh: true } });
      } else {
        console.error('Failed to delete product:', response.statusText);
        showAlert('error','An error occurred while deleting the product. Please try again.');
      }
    } catch (error) {
      console.error('Delete error:', error.message);
      showAlert('error','An error occurred while deleting the product. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${productId}`);
  };

  if (!product) {
    return <div className="empty-cart-message">Loading...</div>;
  }

  return (
    <>
    <div className="product-detail-page">
      <div className="product-images-container">
        <div className="product-images-stack">
          {product.images && product.images.length > 0 && (
            product.images.map((image, index) => (
              <img className="product-image" key={index} src={image} alt={product.title} onMouseEnter={() => setProductImage(image)}/>
            ))
          )}
        </div>
        <img className="product-image-cover" src={productImage} alt={product.title} />
      </div>
  
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        {product.category && <h2 className="product-category">{product.category}</h2>}
        <h2 className="product-price">${product.price}</h2 >
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
        <p className="product-description">{product.description}</p>
  
        {isAdmin && (
          <div className="admin-actions">
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
    <RecommendedByCategory category={product.category} currentProductId={productId} />
    </>
  );  
}


export default ProductDetail;
