import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from '../Components/Input'; 
import "../CssStyling/New.css";
import axios from 'axios';
import {showAlert} from '../Utills/showAlert';

const New = () => {
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:5001/api/products', product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        showAlert('success','Product added to DB!');
        navigate('/products');
      }
    } catch (error) {
      console.error('Add error:', error);
      showAlert('error','An error occurred while adding to DB. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Add New Product</h2>
        <p className="form-group">
            <Input label="Product Title:" type="text" id="title" value={product.title} placeholder="Enter product title" onChange={handleChange} />
        </p>
        <p className="form-group">
            <Input label="Category:" type="text" id="category" value={product.category} placeholder="Enter category" onChange={handleChange} />
        </p>
        <p className="form-group">
            <Input label="Price:" type="number" id="price" value={product.number} placeholder="Enter price" onChange={handleChange} />
        </p>
        <p className="form-group">
            <Input label="Image:" type="text" id="image" value={product.image} placeholder="Enter image URL" onChange={handleChange} />
        </p>
        <p className="form-group">
            <Input label="Description:" type="text" id="description" value={product.description} placeholder="Enter Description" onChange={handleChange} />
        </p>
        <div className="buttonContainer">
          <button type="submit" className="button">
            Add Product
          </button>
          <Link to="/products" className="cancelButton">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default New;
