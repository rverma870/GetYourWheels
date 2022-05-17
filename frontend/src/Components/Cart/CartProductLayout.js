import React from 'react';
import { FaRupeeSign } from "react-icons/fa";
function CartProductLayout({
  index,
  id,
  title,
  thumbnail,
  category,
  company,
  startingPrice,
  finalPrice,
  dealerId,
  safetyRating,
  handleDeleteProduct,
  removebutton,
}) {
  return (
    <>
      <div className="border">
        <div className="row p-2 d-flex">
          <div className="col-5 ">
            <img
              className="img-thumbnail"
              alt="not fount"
              width={"auto"}
              height={"130px"}
              //   style={{ borderRadius: "60px" }}
              src={thumbnail}
            />
          </div>
          <div className="col-3 d-flex flex-column justify-content-start align-items-start">
            <h1 className="fs-3">
              {company} {title}
            </h1>
            <h6 className="fs-6 text-muted">Body Type: {category}</h6>
            <p className="fs-6 mb-0">SafetyRating: {safetyRating}</p>
            <p className="fs-6 fw-bold mb-0 mt-3">
              Trail Price <FaRupeeSign /> 100
            </p>
          </div>
          <div className="col-3 d-flex flex-column justify-content-center align-items-center">
            <div>
              <h4 className="fs-6 ">Expected Delivery</h4>
            </div>
            <div className="text-center">
              <i>Within 24hr from the order</i>
            </div>
          </div>
          {removebutton ? (
            <div className="col-1 d-flex justify-content-end">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => handleDeleteProduct(id)}
              ></button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default CartProductLayout;
