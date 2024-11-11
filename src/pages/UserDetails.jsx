import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Components/Input'; 
import '../CssStyling/New.css';
import {showAlert} from '../Utills/showAlert';

function UserDetails() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          const data = await response.json();
          setUser(data.data.user);
        } catch (error) {
          showAlert('error','Fetch error:', error);
        }
      }
    };
    fetchUser();
  }, [userId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');
    if (!isConfirmed) return;

    try {
        await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      showAlert('success','Account deleted successfully.');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Delete error:', error);
      showAlert('error','An error occurred during deletion. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
        await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
      });

      showAlert('success','Account updated successfully.');
      navigate('/products');
    } catch (error) {
      console.error('Edit error:', error);
      showAlert('error', 'An error occurred during edit. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>My Details:</h2>
        <p className="form-group">
            <Input label="User-Name:" type="text" id="userName" value={user.userName || ""} onChange={handleChange} />
        </p>
        <p className="form-group">
            <Input label="Email:" type="email" id="email" value={user.email || ""} onChange={handleChange} />
        </p>
        <p className="passwordSection">
          <label htmlFor="password">Password:</label>
          <div className="passwordWrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input passwordInput"
              value={user.password || ''}
              onChange={handleChange}
            />
            <button
              type="button"
              className="passwordToggleButton"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </p>
        <div className="buttonContainer">
          <button type="submit" className="button saveButton">
            Save
          </button>
          <button type="button" className="button deleteButton" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
