import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../Components/Input'; 
import '../CssStyling/Authentication.css';
import 'bootstrap/dist/css/bootstrap.css';
import {showAlert} from '../Utills/showAlert';

function Register() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm:'',
    myCart: []
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData, [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/register', FormData);
      console.log('Data sent successfully', response.data);
      showAlert('success','Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error sending data', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        showAlert('error','Something went wrong');
      }
    }
  }

  return (
    <div className="Form">
      <div className="form-container">
        <h2 className="form-title">REGISTER</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
              <Input label="User-Name" type="text" id="userName" placeholder="Username" value={FormData.userName} onChange={handleChange} /> 
          </div>
          <div className="form-group">
              <Input label="Email" type="email" id="email" placeholder="Email@example.com" value={FormData.email} onChange={handleChange} /> 
          </div>
          <div className="form-group">
              <Input label="Password" type="password" id="password" placeholder="Password" value={FormData.password} minLength={6} onChange={handleChange}/>
          </div>
          <div className="form-group">
              <Input label="Confirm Password" type="password" id="passwordConfirm" placeholder="Confirm Password" value={FormData.passpasswordConfirmword} minLength={6} onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary btn-register">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
