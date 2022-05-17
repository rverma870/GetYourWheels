import React,{} from "react";
import {Link} from 'react-router-dom'
import WheelLogo from "../../Images/Logo/WheelLogo.jpeg";
import "../../Styles/NavbarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import LogginLogoutButton from "../LogginAndRegistration/LogginLogoutButton";
import CartButton from "../Cart/CartButton";
import { useSelector} from "react-redux";

const Navbar = () => {
  

  const IsDealer = useSelector((state) => state.IsDealerBoolen);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark text-white p-1 py-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand mx-1" to="/">
            <img
              className="img-responsive"
              src={WheelLogo}
              alt="This is logo"
              width="auto"
              height="80px"
              style={{ borderRadius: "80%" }}
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {IsDealer ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Dealer/Home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Dealer/AddProducts"
                  >
                    Add Products
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <form className="d-flex m-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light " type="submit">
                <FontAwesomeIcon icon={faSearch} size="1x" />
              </button>
            </form>
          </div>

          <LogginLogoutButton />
          <CartButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;



