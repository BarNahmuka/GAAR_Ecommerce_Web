import React, { useState, useEffect } from 'react';
import Input from '../Components/Input'; 
import {showAlert} from '../Utills/showAlert';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const url = window.location.pathname;
    const token = url.split('/')[2]; 
    setToken(token);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/resetPassword/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, passwordConfirm }),
      });

      if (response.ok) {
        showAlert('success','Password reset successful!');
      } else {
        const errorData = await response.json();
        showAlert('error','Error: ' + errorData.message);
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      showAlert('error','Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h1>Reset Password</h1>
        <form className="forgot-password-form" onSubmit={handleUpdate}>
          <div className="form-group">
              <Input label="New Password:" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
              <Input label="Confirm Password:" type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
