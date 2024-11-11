import React from "react";
import PromoVid from '../Assets/PromoVid.mp4';
import '../Bootstrap/carousel.css'; 
import '../Bootstrap/carousel.rtl.css'; 
import '../CssStyling/Home.css'; // Your custom styles for Home component

function Home() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      {/* Video Section */}
      <section>
        <video autoPlay loop muted className="background-video w-100" style={{ height: "32rem" }}>
          <source src={PromoVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="container">
          <div className="carousel-caption text-start">
            <h1>Welcome to the E-commerce site</h1>
            {!isLoggedIn && (
              <p><button onClick={handleLogin} className="btn btn-primary btn-lg">Get Started!</button></p>
            )}
          </div>
        </div>
      </section>

      {/* Marketing Section */}
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

      <hr className="featurette-divider" />

      {/* Featurette Section */}
      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span></h2>
          <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
        </div>
        <div className="col-md-5">
          <img className="img-fluid mx-auto" src="feature-image-1.jpg" alt="Feature 1" />
        </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
        <div className="col-md-7 order-md-2">
          <h2 className="featurette-heading">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
          <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
        </div>
        <div className="col-md-5 order-md-1">
          <img className="img-fluid mx-auto" src="feature-image-2.jpg" alt="Feature 2" />
        </div>
      </div>

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
