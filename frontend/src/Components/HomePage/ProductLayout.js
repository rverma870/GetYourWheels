import React from 'react';
import { FaRupeeSign } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import AddToCartButton from './AddToCartButton';
import "../../Styles/Home/ProductLayout.css"

function ProductLayout({
  index,
  id,
  title,
  thumbnail,
  category,
  company,
  startingPrice,
  finalPrice,
}) {

  const userDetails = useSelector((state) => state.UserDetail);

  const addToCartURI = `${process.env.REACT_APP_HOST_NAME}/user/addToCart/${userDetails.cartId}/${id}`;
  
  const handleAddToCart = async () => {
    if (userDetails.cartId !== "") {
      await axios
        .get(addToCartURI, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(
            "error from handleAddToCart of productDetails.js",
            err
          );
        });
    }
  };


  return (
    <>
      <div className="productlayout card product-item border-0 mb-4 me-2">
        <Link
          to={`/Product/${id}`}
          className="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
        >
          <img
            className="img-fluid w-100"
            src={thumbnail}
            alt={title}
            style={{ height: "10rem", width: "5rem" }}
          />
        </Link>
        <div className="card-body border-start border-end text-center p-0 pt-3 pb-2">
          <h5 className="ProductLayoutHeading text-truncate ">
            {company} {title}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
          <div className="d-flex justify-content-center">
            <h6>
              <FaRupeeSign />
              {startingPrice}-{finalPrice} Lakhs*
            </h6>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          <Link
            to={`/Product/${id}`}
            className="ProductLayoutButton btn btn-sm text-dark p-0"
          >
            <ImEye size={"1.2rem"} /> View Detail
          </Link>

          <AddToCartButton handleAddToCart={handleAddToCart} />
        </div>
      </div>
    </>
  );
}

export default ProductLayout;

