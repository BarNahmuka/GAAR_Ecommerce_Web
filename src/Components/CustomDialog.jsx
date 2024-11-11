import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ComponentsStyling/CustomDialog.css';
import { showAlert } from '../Utills/showAlert';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PuWIL034aRwbOPnKm6MhyQNF7WLT4g5fkBRKlhVIQXZMHTya5BmjvZB7ScXLJtQAF4w8anqO8zATwdAKQl7zBaI00Q4yd2Tvx');

function CustomDialog({ cart, show, onClose, total, userId }) {
  const [infoUser, setInfoUser] = useState({
    address: '',
    phoneNumber: ''
  });

  if (!show) return null;

  const onPay = async () => {
    const stripe = await stripePromise;
    try {
      const queryParams = new URLSearchParams({
        address: infoUser.address,
        phoneNumber: infoUser.phoneNumber,
        total_purchase: total
      }).toString();

      const response = await axios.get(`http://localhost:5001/api/users/checkout-session/${userId}?${queryParams}`);
      const sessionId = response.data.session.id;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Error redirecting to checkout:', error);
        showAlert('error', 'An error occurred while redirecting to checkout. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching checkout session:', err);
      showAlert('error', 'An error occurred while fetching the checkout session. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfoUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="custom-dialog-overlay">
      <div className="custom-dialog">
        <button className="custom-dialog-close" onClick={onClose}>×</button>
        <h2>Your Order:</h2>
        <form>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <span className="product-title">{item.product_title}</span>
                <span className="product-quantity">x{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="address">Your Address:</label>
            <input
              name="address"
              type="text"
              value={infoUser.address}
              id="address"
              placeholder="Enter your address"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Your Phone Number:</label>
            <input
              name="phoneNumber"
              type="text"
              value={infoUser.phoneNumber}
              id="phoneNumber"
              placeholder="Enter your phone number"
              pattern="05\d{8}"
              title="Phone number must start with 05 and be 10 digits long"
              onChange={handleChange}
              required
            />
          </div>
          <div className="total">
            <p>Your total is ${total.toFixed(2)}</p>
          </div>
          <div className="dialog-buttons">
            <button type="button" className="custom-dialog-confirm" onClick={onPay}>Continue to payment</button>
            <button type="button" className="custom-dialog-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomDialog;
