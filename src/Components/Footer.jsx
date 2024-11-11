import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ComponentsStyling/Footer.css'; 
import * as FaIcons from "react-icons/fa"; 
import { RiVisaLine } from "react-icons/ri"; 
import { SiAmericanexpress } from "react-icons/si";

function Footer() {
    return (
        <div className="container-fluid"> 
            <footer className="row row-cols-1 row-cols-md-4 py-5 border-top">
                <div className="col mb-3 d-flex flex-column align-items-start">
                    <a href="/" className="d-flex align-items-center mb-3 text-decoration-none">
                        <FaIcons.FaBootstrap size={45} className="me-2" style={{ background: '#000', color: '#fff', padding: '10px', borderRadius: '5px' }} />
                    </a>
                    <p className="text-muted">&copy;  2024 GAAR, Inc.</p> 
                </div>
                <div className="col mb-3">
                <h5 style={{ fontSize: '1.5rem' }}>Stay Connected</h5>
                    <div className="d-flex"> 
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}> 
                            <FaIcons.FaInstagram size={30} /> 
                        </a> 
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}>
                            <FaIcons.FaFacebookMessenger size={30} />
                        </a>
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}>
                            <FaIcons.FaWhatsapp size={30} />
                        </a>
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}>
                            <FaIcons.FaFacebookSquare size={30} />
                        </a>
                        <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.5rem' }}>
                            <FaIcons.FaTwitter size={30} />
                        </a>
                    </div>
                </div>
                <div className="col mb-3">
                <h5 style={{ fontSize: '1.5rem' }}>Pay Using</h5>
                    <div className="d-flex">
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}> 
                        </a> 
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}>
                            <FaIcons.FaApplePay size={40} />
                        </a>
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}>
                            <RiVisaLine size={40} />
                        </a>
                        <a href="#" className="nav-link p-0 text-muted me-3" style={{ fontSize: '1.5rem' }}>
                            <SiAmericanexpress  size={40} />
                        </a>
                        <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.5rem' }}>
                            <FaIcons.FaGooglePay  size={40} />
                        </a>
                    </div>
                </div>
                <div className="col mb-3">  
                    <h5 style={{ fontSize: '1.5rem' }}>About GAAR</h5> 
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.1rem' }}>Company info</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.1rem' }}>News</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.1rem' }}>Policies</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.1rem' }}>FAQs</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="#" className="nav-link p-0 text-muted" style={{ fontSize: '1.1rem' }}>About</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
