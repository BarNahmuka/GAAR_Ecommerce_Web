import React, { useState } from 'react';
import Input from '../Components/Input'; 
import '../CssStyling/ForgotPassword.css';
import {showAlert} from '../Utills/showAlert';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showAlert('success','Email sent successfully!');
      } else {
        const errorData = await response.json();
        showAlert('error','Error: ' + errorData.message);
      }
    } catch (err) {
      console.error('Error sending email:', err);
      showAlert('error','Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h1>Forgot Your Password?</h1>
        <p>Enter your email address below, and we’ll send you a link to reset your password.</p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
              <Input label="Email Address:" type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
