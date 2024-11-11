import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../CssStyling/SuccessPage.css';  
import { showAlert } from '../Utills/showAlert';

const SuccessPage = () => {
  const { userId } = useParams();
  const [queryParams, setQueryParams] = useState({
    address: '',
    phoneNumber: '',
    totalPurchase: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const address = query.get('address') || '';
        const phoneNumber = query.get('phoneNumber') || '';
        const totalPurchase = query.get('total_purchase') || '';

        setQueryParams({
          address,
          phoneNumber,
          totalPurchase
        });

        console.log('Sending data to server:', { address, phoneNumber, totalPurchase });

        const response = await axios.post(`http://localhost:5001/api/users/createOrder/${userId}`, {
          address,
          phoneNumber,
          totalPurchase
        });

        console.log('Server response:', response);

        if (response.status === 200) {
          showAlert('success', 'The order was successfully placed!');
          setTimeout(() => {
            navigate(`/${userId}/myOrders`);
          }, 7000);
        } else {
          throw new Error('Server response was not OK');
        }
      } catch (error) {
        console.error('Error making POST request:', error);
        setError('There was an error processing your order. Please try again later.');
      } 
      setLoading(false);
    };

    fetchData();
  }, [location.search, userId, navigate]);

  return (
    <div className="success-page">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Processing your order...</p>
        </div>
      ) : error ? (
        <div className="message-container">
          <h1>Something went wrong</h1>
          <p>{error}</p>
        </div>
      ) : (
        <div className="message-container">
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase.</p>
          <p><strong>Address:</strong> {queryParams.address}</p>
          <p><strong>Phone Number:</strong> {queryParams.phoneNumber}</p>
          <p><strong>Total Purchase:</strong> ${parseFloat(queryParams.totalPurchase).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
