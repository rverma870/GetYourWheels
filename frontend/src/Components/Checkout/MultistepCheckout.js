import React from "react";
import "../../Styles/Checkout/MultistepCheckout.css";
import DeliveryAddress from "./DeliveryAddress";
import ConfirmAndPayNow from "./ConfirmAndPayNow";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckOutPageActionCreator } from "../../State/IndexActions";
import { useNavigate } from "react-router-dom";

function MultistepCheckout() {

  const page = useSelector((state) => state.PageStatus); 
  const checkoutOBJ = useSelector((state) => state.CheckOutOBJ);

  const dispatch = useDispatch();
  const pageAction = bindActionCreators(CheckOutPageActionCreator, dispatch);

  let navigate = useNavigate();

  const handleNext = ()=>{
    if(page<2){
        pageAction.increaseCheckOutPage();
    }    
  };

  const handlePrevious = () => {
    if (page > 0) {
        pageAction.decreaseCheckOutPage();
    }
  };

  const handleReset = () => {
      pageAction.resetCheckOutPage();
      navigate("/");
  };

  return (
    <>
      <div className="container my-3 d-flex justify-content-center">
        <div className="card" style={{ width: "80rem" }}>
          <div className="card-header p-0">
            <div className="progress" style={{ height: "30px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${(page / 2) * 100}%` }}
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Number((page / 2) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="card-body">
            {page === 0 ? <DeliveryAddress /> : ""}
            {page === 1 ? <ConfirmAndPayNow /> : ""}
            {page === 2 ? <OrderSummary /> : ""}
          </div>

          <div className="card-footer text-end">
            {page !== 0 ? (
              <button
                type="button"
                className="btn btn-secondary me-1"
                onClick={page !== 2 ? handlePrevious : handleReset}
              >
                {page === 2 ? "Go Home" : "Previous"}
              </button>
            ) : (
              ""
            )}

            {page < 1 ? (
              <button
                type="button"
                className="btn btn-success"
                disabled={checkoutOBJ.deliveryAddress!==""?"":"disabled"}
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MultistepCheckout;
