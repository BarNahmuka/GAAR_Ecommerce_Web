import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDialog from '../Components/CustomDialog'; 
import '../CssStyling/Cart.css';
import { showAlert } from '../Utills/showAlert';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [total, setTotal] = useState(0);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const fetchUserCart = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:5001/api/users/${userId}/cart`);
                    const data = await response.json();
                    setCartItems(data.cart || []);
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };
        fetchUserCart();
    }, [userId]);

    useEffect(() => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + (item.quantity * parseFloat(item.product_price || 0));
        }, 0);
        setTotal(totalPrice);
    }, [cartItems]);

    const handleBuyNowClick = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const increaseQuantity = async (itemId) => {
      const item = cartItems.find(item => item._id === itemId);
      const updatedQuantity = item.quantity + 1;
  
      try {
          const response = await axios.patch(`http://localhost:5001/api/users/${userId}/cart/update`, {
              itemId: itemId,
              updatedQuantity
          });

          setCartItems(response.data.cart);
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
      } catch (error) {
          console.error('Error updating product quantity:', error);
          showAlert('error', 'Failed to update quantity.');
      }
  };
  
    const decreaseQuantity = async (itemId) => {
        const item = cartItems.find(item => item._id === itemId);
        if (item.quantity > 1) {
            const updatedQuantity = item.quantity - 1;

            try {
              const response = await axios.patch(`http://localhost:5001/api/users/${userId}/cart/update`, {
                    itemId: itemId,
                    updatedQuantity
                });

                setCartItems(response.data.cart);
                localStorage.setItem('cart', JSON.stringify(response.data.cart));
            } catch (error) {
                console.error('Error updating product quantity:', error);
                showAlert('error', 'Failed to update quantity.');
            }
        }
    };

    const deleteItem = async (itemId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item from your cart?');
        if (!isConfirmed) return;

        try {
            await fetch(`http://localhost:5001/api/users/${userId}/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const updatedCart = cartItems.filter(item => item._id !== itemId);
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Delete error:', error);
            showAlert('error', 'An error occurred while deleting the item. Please try again.');
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="cart-container">
                <h2 className="cart-title">Shopping Cart</h2>
                <div className="empty-cart-message">
                    You don't have any products in the cart yet...
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item._id} className="card">
                        <img src={item.product_images[0]} alt={item.product_title} />
                        <div>
                            <h3>{item.product_title}</h3>
                            <p className="price">${item.product_price}</p>
                            <p>
                                <button className="decrease" onClick={() => decreaseQuantity(item._id)}>-</button>
                                {item.quantity}
                                <button className="increase" onClick={() => increaseQuantity(item._id)}>+</button>
                            </p>
                            <button
                                className="delete"
                                style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => deleteItem(item._id)}> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total">
                <p className="total-price">Total Price: ${total.toFixed(2)}</p>
                <button className="buy-now-button" onClick={handleBuyNowClick}>Buy Now</button>
            </div>
    
            <CustomDialog cart={cartItems} show={showDialog} onClose={handleCloseDialog} total={total} userId={userId} />
        </div>
    );
}    

export default Cart;
