import React from 'react'
import WheelLogo from '../Images/Logo/LogoWithoutBG.png'
import payments from "../Images/Footer/payments.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Footer/footerStyle.css";
function Footer() {
    return (
      <>
        <div className="footer container-fluid  pt-4 border-top border-3 bg-dark">
          <div className="row pt-5 px-3 ">
            <div className="FooterContent col-lg-5 col-md-12 mb-5 ">
              <a href="/" className="text-decoration-none text-dark ">
                <div className="FooterLogo px-5 d-flex justify-content-around align-items-center border border-dark  mb-4">
                  <span className="text-primary font-weight-bold">
                    <img
                      className="img-responsive"
                      src={WheelLogo}
                      alt="This is logo"
                      width="auto"
                      height="100px"
                    />
                  </span>
                  <span className="display-6 font-weight-semi-bold fw-bold">
                    MY WHEELS
                  </span>
                </div>
              </a>
              <p>
                <a
                  href="/"
                  className="fst-italic text-decoration-none text-danger me-1"
                >
                  MyWheel.com
                </a>
                is India's leading car search venture that helps users buy cars
                that are right for them. Its website and app carry rich
                automotive content such as expert reviews, detailed specs and
                prices, comparisons as well as videos and pictures of all car
                brands and models available in India.
              </p>
              <p className="mb-2">Indore, India</p>
              <p className="mb-2">
                <a
                  href="https://mail.google.com/"
                  className="fst-italic text-decoration-none text-danger"
                  target="_blank"
                  rel="noreferrer"
                >
                  mywheels@gmail.com
                </a>
              </p>
              <p className="mb-0">
                <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
                67890
              </p>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="row">
                <div className="col-md-4 mb-5">
                  <h5 className="font-weight-bold mb-4 mx-5">
                    OVERVIEW
                  </h5>
                  <div className="d-flex flex-column justify-content-start ms-4">
                    <a
                      className="mb-2 text-decoration-none"
                      href="/AboutUs"
                    >
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>About us</span>
                    </a>
                    <a
                      className=" mb-2 text-decoration-none"
                      href="/ContactUs"
                    >
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Contact us</span>
                    </a>
                    <a
                      className=" mb-2 text-decoration-none"
                      href="/FAQs"
                    >
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>FAQs</span>
                    </a>
                    <a
                      className=" mb-2 text-decoration-none"
                      href="/PrivacyPolicy"
                    >
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Privacy Policy</span>
                    </a>
                    <a
                      className=" mb-2 text-decoration-none"
                      href="/TermAndConditions"
                    >
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Term & Condition</span>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <h5 className="font-weight-bold  mb-4 mx-4">
                    QUICK LINKS
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    <a
                      className=" mb-2 text-decoration-none"
                      href="/DealerRegistration"
                    >
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Be a Seller</span>
                    </a>
                    <a className=" mb-2 text-decoration-none" href="#">
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Advertise with Us</span>
                    </a>
                    <a className=" mb-2 text-decoration-none" href="#">
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Careers</span>
                    </a>
                    <a className=" mb-2 text-decoration-none" href="#">
                      <i className="mx-3">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </i>
                      <span>Customer Care</span>
                    </a>
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <h5 className="font-weight-bold  mb-4">
                    Get update of your favourite Car
                  </h5>
                  <form action="">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border my-2 py-2"
                        placeholder="Your Name"
                        required="required"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control border my-3 py-2"
                        placeholder="Your Email"
                        required="required"
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-block  py-3 mt-1"
                        type="submit"
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top border-light mx-xl-5 py-4">
            <div className="col-md-9 px-xl-0">
              <p className="mb-md-0 text-center text-md-left ">
                &copy;{" "}
                <a className=" font-weight-semi-bold" href="/">
                  www.mywheels.com
                </a>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-md-3 px-xl-0 text-center text-md-right">
              <img className="img-fluid" src={payments} alt="" />
            </div>
          </div>
        </div>
      </>
    );
}

export default Footer;
