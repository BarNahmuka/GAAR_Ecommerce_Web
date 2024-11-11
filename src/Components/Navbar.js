import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import { SidebarDataLoggedIn } from "./SidebarData";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Bootstrap/headers.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:5001/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data => setUserName(data.data.user.userName))
            .catch(error => console.error('Fetch error:', error));
        }
    }, [isLoggedIn]);

    const logout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserName('');
        window.location.href = '/';
    };

    return (
        <header>
            <div className="px-3 py-2 text-bg-dark border-bottom sticky-top" >
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <FaIcons.FaBootstrap size={45} style={{ color: '#fff' }} className="me-2" />
                    </Link>

                    <ul className="nav col-lg-auto my-2 justify-content-end text-small" style={{ marginLeft: 'auto' }}>
                        {isLoggedIn ? (
                            SidebarDataLoggedIn.map((item, index) => (
                                <li key={index} className={`nav-item ${item.cName}`}>
                                    <Link 
                                        className="nav-link" 
                                        to={item.path} 
                                        style={{ fontSize: '18px', color: '#fff', padding: '8px 16px' }} 
                                        onMouseEnter={(e) => e.target.style.color = 'black'} 
                                        onMouseLeave={(e) => e.target.style.color = '#fff'}   
                                    >
                                        {React.cloneElement(item.icon, { size: 28, style: { color: '#fff' } })} 
                                        <span className="ms-2">{item.title}</span>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="nav-item">
                                <Link 
                                    className="nav-link d-flex align-items-center" 
                                    to="/" 
                                    style={{ fontSize: '18px', color: '#fff' }} 
                                    onMouseEnter={(e) => e.target.style.color = 'black'} 
                                    onMouseLeave={(e) => e.target.style.color = '#fff'}   
                                >
                                    <FaIcons.FaHome size={28} className="me-1" style={{ color: '#fff' }} />
                                    <span className="ms-2">Home</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="navbar navbar-light bg-light border-bottom">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <form className="d-flex" role="search" style={{ marginLeft: 'auto', marginRight: 'auto', width: '30%' }}>
                        <input type="search" className="form-control me-2" placeholder="Search..." aria-label="Search" />
                        <button className="btn btn-outline-primary" type="submit">
                            <FaIcons.FaSearch />
                        </button>
                    </form>

                    <div className="text-end me-4">
                        {isLoggedIn ? (
                            <>
                                <span className="navbar-text me-3">{isAdmin ? 'Admin' : userName}</span>
                                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-light text-dark me-2">Login</Link>
                                <Link to="/register" className="btn btn-primary">Sign-up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ height: '20px' }}></div>
        </header>
    );
}

export default Navbar;
