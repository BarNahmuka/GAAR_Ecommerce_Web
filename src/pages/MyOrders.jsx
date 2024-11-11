import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CssStyling/MyOrders.css'; 
import {showAlert} from '../Utills/showAlert';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5001/api/users/${userId}/myOrders`);  
                    if (response.status === 200) {
                        const data = response.data;
                        if (data && Array.isArray(data.orders)) {
                            setOrders(data.orders);
                        } else {
                            console.error('Unexpected data structure:', data);
                            setOrders([]); 
                        }
                    }
                } catch (error) {
                    showAlert('error', 'An error occurred while fetching orders.');
                }
            }
        };
        fetchUserOrders();
    }, [userId]); 

    return (
        <div className="my-orders-container">
            <h2 className="orders-header">My Orders</h2>
            {orders && orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <div className="order-header">
                                <h3 className="order-date">Order Date: {new Date(order.date_order).toLocaleDateString()}</h3>
                                <p className="order-total"><strong>Total Purchase:</strong> ${order.total_purchase.toFixed(2)}</p>
                            </div>
                            <div className="order-body">
                                <ul className="order-products">
                                    {order.products.map((product, productIndex) => (
                                        <li key={productIndex} className="order-product">
                                            {product.product_title} - <strong>Quantity:</strong> {product.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <p className="order-address"><strong>Address:</strong> {order.address}</p>
                                <p className="order-phone"><strong>Phone Number:</strong> {order.phoneNumber}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-orders-message">
                    <h2>No Orders Found</h2>
                </div>
            )}
        </div>
    );
}

export default MyOrders;
