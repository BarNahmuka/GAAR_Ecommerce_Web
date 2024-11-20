import React from "react";
import PromoVid from '../Assets/PromoVid.mp4';
import '../Bootstrap/carousel.css'; 
import '../Bootstrap/carousel.rtl.css'; 
import '../CssStyling/Home.css'; 
import { Card } from "react-bootstrap";

function Home() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <section className="home-container mb-0 pb-0">
        <video
          autoPlay
          loop
          muted
          className="background-video">
          <source src={PromoVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <h1>Welcome to the E-commerce site</h1>
        </div>
      </section>

      <section className="container marketing mt-5">
        <div className="row">
          <div className="col-lg-4 text-center">
            <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="your-image-1.jpg" alt="Sample Image 1" />
            <h2>Heading 1</h2>
            <p>Some placeholder content for the first column.</p>
            <p><a className="btn btn-secondary" href="#">View details »</a></p>
          </div>
          <div className="col-lg-4 text-center">
            <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="your-image-2.jpg" alt="Sample Image 2" />
            <h2>Heading 2</h2>
            <p>Some placeholder content for the second column.</p>
            <p><a className="btn btn-secondary" href="#">View details »</a></p>
          </div>
          <div className="col-lg-4 text-center">
            <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="your-image-3.jpg" alt="Sample Image 3" />
            <h2>Heading 3</h2>
            <p>Some placeholder content for the third column.</p>
            <p><a className="btn btn-secondary" href="#">View details »</a></p>
          </div>
        </div>
      </section>

  <section className="background-image-section">
  <div className="py-5">
    <h1 className="display-5 fw-bold text-white">Ready to get started?</h1>
    <div className="col-lg-6 mx-auto">
      <p className="fs-5 mb-4">
        Explore millions of products from trusted suppliers by signing up
        today!
      </p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        {!isLoggedIn && (
          <button
            onClick={handleLogin}
            className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">
            Get Started!
          </button>
        )}
      </div>
    </div>
  </div>
</section>

   <hr className="featurette-divider" />

    <div class="row row-md-3 ">
      <h1>Source direct-from-factory</h1>
      <div class="col-md-4">
        <div class="coverOne">
          <h4>Get samples</h4>
        </div>
      </div>
      <div class="col-md-4">
        <div class="coverTwo">
          <h4>Connect with two-ranking manufacturers</h4>
        </div>
      </div>
      <div class="col-md-4">
        <div class="coverThree">
          <h4>Take factory live tours</h4>
        </div>
      </div>
     </div>

      <section className="cover-image">
      <div className="cover-content">
        <h2 className="security-floor_title">
          Trade with confidence from <br /> production quality to purchase protection
        </h2>
      </div>
      <div className="row align-items-stretch justify-content-center mt-5">
        <div className="col-md-6 col-lg-6">
          <div className="h-100 p-5 border rounded-3 square-box">
            <h2>Verified Supplier</h2>
            <p>
              Connect with a variety of suppliers with third-party-verified credentials and capabilities. Look for the "Verified" logo to begin sourcing with experienced suppliers your business could rely on.
            </p>
            <button className="btn btn-outline-light" type="button">Learn More</button>
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="h-100 p-5 border rounded-3 square-box">
            <h2>Trade Assurance</h2>
            <p>
              Source confidently with access to secure payment options, protection against product or shipping issues, and mediation support for any purchase-related concerns when you order and pay on GAAR.
            </p>
            <button className="btn btn-outline-light" type="button">Learn More</button>
          </div>
        </div>
      </div>
    </section>


      <hr className="featurette-divider" />

      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
          <p className="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content.</p>
        </div>
        <div className="col-md-5">
          <img className="img-fluid mx-auto" src="feature-image-3.jpg" alt="Feature 3" />
        </div>
      </div> 
    </>
  );
}

export default Home;
