import React from 'react'
import carousel1 from "../Images/homePageImages/carousel1.jpeg";
import carousel2 from "../Images/homePageImages/carousel2.jpeg";

function HomeCarousel() {

    return (
      <div
        id="header-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
        // data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: 500 }}>
            <img className="img-fluid" src={carousel1} alt="carousel2" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 700 }}>
                <h3 className="homeCarouseltext display-4 font-weight-semi-bold mb-3">
                  Find The Best Car Suitable For You
                </h3>
                <h4 className="homeCarouseloffer text-uppercase font-weight-medium mb-2">
                  10% Off On Your First Order
                </h4>
                <a href="/" className="btn btn-light py-2 px-3">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: 500 }}>
            <img className="img-fluid" src={carousel2} alt="carousel2" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: 700 }}>
                <h3 className="homeCarouseltext display-4 font-weight-semi-bold mb-4">
                  Try Your Favorite Car At Reasonable Price
                </h3>
                <h4 className="homeCarouseloffer text-uppercase font-weight-medium mb-3">
                  10% Off On Your First Order
                </h4>
                <a href="/" className="btn btn-light px-3">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#header-carousel"
          data-bs-slide="prev"
        >
          <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
            <span className="carousel-control-prev-icon "></span>
          </div>
        </a>
        <a
          className="carousel-control-next"
          href="#header-carousel"
          data-bs-slide="next"
        >
          <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
            <span className="carousel-control-next-icon "></span>
          </div>
        </a>
      </div>
    );
}

export default HomeCarousel
