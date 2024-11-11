import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Components/Input'; 
import '../CssStyling/New.css';
import axios from 'axios';
import {showAlert} from '../Utills/showAlert';

function Edit() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
                const data = response.data;
                setProduct(data);
            } catch (error) {
                console.error('Fetch error:', error);
                alert('Failed to fetch product details.');
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5001/api/products/${productId}`, product, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            showAlert('success','Product updated successfully.');
            navigate('/products');
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    if (!product) {
        return <div className="empty-cart-message">Loading...</div>;
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Edit Product</h2>
                <p className="form-group">
                    <Input label="Product Title:" type="text" id="title" value={product.title || ""} onChange={handleChange} />
                </p>
                <p className="form-group">
                    <Input label="Category:" type="text" id="category" value={product.category || ""} onChange={handleChange} />
                </p>
                <p className="form-group">
                    <Input label="Price:" type="number" id="price" value={product.price || ""} onChange={handleChange} />
                </p>
                <p className="form-group">
                    <Input label="Image:" type="text" id="image" value={product.image || ""} onChange={handleChange} />
                </p>
                <p className="form-group">
                    <Input label="Description:" type="text" id="description" value={product.description || ""} onChange={handleChange} />
                </p>
                <div className="editButton">
                    <button type="submit" className="button saveButton">Save</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
