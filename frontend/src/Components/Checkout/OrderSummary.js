import React from "react";
import { useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import "../../Styles/Checkout/OrderSummary.css";
import { TiTick } from "react-icons/ti";


function OrderSummary() {

  const userDetails = useSelector((state) => state.UserDetail);
  const Cart = useSelector((state) => state.Cart);

  return (
    <>
      <div className="px-4 pt-2">
        <h5 className="text-uppercase">{userDetails.name}</h5>
        <div className="d-flex">
          <div className="fs-3 mt-1">Booking Confirm</div>
          <div>
            <TiTick size={"3rem"} color={"green"} className="p-0 m-0" />
          </div>
        </div>
        <h4 className="mt-3 mb-5">Thank you for Booking</h4>
        <span className="">Payment Summary</span>
        <div className="mb-3">
          <hr className="new1" />
        </div>
        <div className="d-flex justify-content-between">
          <span className="font-weight-bold">No of Vehical Booked</span>
          <span className="text-muted">{Cart.products.length}</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <span className="fw-bold font-weight-bold fs-5">Total</span>
          <span className="font-weight-bold text-danger fs-5 fw-bold">
            <FaRupeeSign />
            {Cart.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
