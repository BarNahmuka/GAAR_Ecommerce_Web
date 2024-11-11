import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { showAlert } from '../Utills/showAlert'; 
import Input from '../Components/Input'; 
import '../CssStyling/Authentication.css'; 
import 'bootstrap/dist/css/bootstrap.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [alert, setAlert] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/log', formData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id); 
            localStorage.setItem('user', user.email);

            const isAdmin = user.email === "nahmuka2@gmail.com";
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem("loggedIn", true);

            showAlert('success','Login successful!');
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging in:', error);
            showAlert('error','Invalid email or password.');
        }
    };

    return (
        <div className="Form">
            <div className="form-container">
                <h2 className="form-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Input label="Email" type="email" id="email" placeholder="Email@example.com" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <Input label="Password" type="password" id="password" placeholder="Password" value={formData.password} minLength={6} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-register">Login</button>
                    <div className="register-text">
                        <p>You don't have an account?</p>
                        <Link to="/register">Register</Link>
                    </div>
                    <div className="register-text">
                        <Link to="/forgotPassword"><p>Forgot Password?</p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
