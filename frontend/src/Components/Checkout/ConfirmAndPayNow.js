import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckOutActionCreator } from "../../State/IndexActions";
import { CheckOutPageActionCreator } from "../../State/IndexActions";
import { FaRupeeSign } from "react-icons/fa";
import CartProductLayout from "../Cart/CartProductLayout";
import WheelLogo from "../../Images/Logo/WheelLogo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function ConfirmAndPayNow() {

  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.UserDetail);
  const checkoutDetails = useSelector((state) => state.CheckOutOBJ);

  const dispatch = useDispatch();
  const CheckOutActions = bindActionCreators(CheckOutActionCreator, dispatch);
  const pageAction = bindActionCreators(CheckOutPageActionCreator, dispatch);

  let navigate = useNavigate();

  const CreateOrderURL = `${process.env.REACT_APP_HOST_NAME}/user/placeOrder`;
  const UpdateTransactionStatusURL = `${process.env.REACT_APP_HOST_NAME}/user/completeTransaction`;
  const RemovefailedTransactionURL = `${process.env.REACT_APP_HOST_NAME}/user/removeOrder/${checkoutDetails.serverOrderId}`;


  const handlePaymentFail = ()=>{
    CheckOutActions.removeCheckOut();
    navigate("/User/Cart");
  };



  useEffect(() => {

    console.log(checkoutDetails, "from useeffect of confirm and paynow.js");

    // if order id is created from the razorpay then opening razorpay form 
    if (checkoutDetails.transactionStatus === "created") {
      let options = {
        key: "rzp_test_svUpXIg88rwFrC",
        amount: checkoutDetails.AmountOfOrder.totalAmount,
        name: "MyWheels",
        description: "order Payment",
        image: WheelLogo,
        order_id: checkoutDetails.razOrderId,
        handler: function (res) {
          CheckOutActions.setCheckOut({
            ...checkoutDetails,
            razPaymentId: res.razorpay_payment_id,
            razSignature: res.razorpay_signature,
            transactionStatus: "completed",
            paymentStatus: "paid",
            amount: { ...checkoutDetails.AmountOfOrder },
          });
     
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.mobile,
        },
        notes: {
          address: "MyWheels",
        },
      };

      let rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.reason);

        if (
          checkoutDetails.serverOrderId !== "" &&
          checkoutDetails.serverOrderId !== null &&
          checkoutDetails.serverOrderId !== undefined
        ) {
          axios
            .delete(RemovefailedTransactionURL, {
              withCredentials: true,
            })
            .then((res) => {
              CheckOutActions.removeCheckOut();
              swal("Failed !", "Oops Payment failed ! Try Again", "error").finally(handlePaymentFail);
            })
            .catch((err) => {
              console.error(
                err,
                "Error form confirmandpaynow.js in remove pending transaction"
              );
            });
        }
      });

      rzp.open();
    }

    //and if payment get successfull from the above form then sending data back to server by below method;
    if (
      checkoutDetails.razOrderId !== "" &&
      checkoutDetails.razPaymentId !== "" &&
      checkoutDetails.razSignature !== "" &&
      checkoutDetails.serverOrderId !== ""
    ) {
      axios
        .post(
          UpdateTransactionStatusURL,
          {
            id: checkoutDetails.serverOrderId,
            userId: checkoutDetails.userId,
            productIds: checkoutDetails.productsIds,
            address: checkoutDetails.deliveryAddress,
            amount: checkoutDetails.AmountOfOrder,
            modeOfPayment: "Online",
            razOrderId: checkoutDetails.razOrderId,
            razPaymentId: checkoutDetails.razPaymentId,
            razSignature: checkoutDetails.razSignature,
            transactionStatus:
              checkoutDetails.transactionStatus,
            paymentStatus: checkoutDetails.paymentStatus,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          CheckOutActions.removeCheckOut();
          swal("Payment Successfull !", "click below to continue", "success").finally(()=>pageAction.increaseCheckOutPage());
        })
        .catch((err) => {
          console.error(
            err,
            "Error from confirmAndPayNow.js on updating transaction axios"
          );
        });
    }
  }, [checkoutDetails]);

  const InitiatePayment = () => {
    let paymentAmount = checkoutDetails.AmountOfOrder.totalAmount;

    if (
      paymentAmount !== null &&
      paymentAmount !== "" &&
      paymentAmount !== undefined
    ) {
      axios
        .post(
          CreateOrderURL,
          {
            userId: checkoutDetails.userId,
            productIds: checkoutDetails.productsIds,
            address: checkoutDetails.deliveryAddress,
            amount: checkoutDetails.AmountOfOrder,
            modeOfPayment: "Online",
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);

          CheckOutActions.setCheckOut({
            ...checkoutDetails,
            amount: { ...checkoutDetails.AmountOfOrder },
            serverOrderId: res.data.id,
            razOrderId: res.data.razOrderId,
            transactionStatus: res.data.transactionStatus,
            paymentStatus: res.data.paymentStatus,
          });

        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const renderCart = Cart.products.map((product, index) => {
    const {
      id,
      productName,
      // priceRange,
      // image,
      // discription,
      company,
      category,
      // variants,
      // bhp,
      dealerId,
      startingPrice,
      finalPrice,
      // noOfSeats,
      // rateCount,
      // rating,
      safetyRating,
      thumbnail,
    } = product;

    return (
      <CartProductLayout
        id={id}
        key={index}
        index={index}
        title={productName}
        startingPrice={startingPrice}
        finalPrice={finalPrice}
        thumbnail={thumbnail}
        category={category}
        company={company}
        safetyRating={safetyRating}
        dealerId={dealerId}
        removebutton={false}
      />
    );
  });

  return (
    <>
      <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive ">
          <div className="card">
            <div className="card-header">
              <h1 className="fs-4 mb-0">Orders</h1>
            </div>
            <div className="card-body">
              {Cart.products.length > 0 ? renderCart : ""}
            </div>
          </div>
        </div>
        <div className="col-lg-4 ">
          <div className="card border-3 mb-5">
            <div className="card-header">
              <h5 className="m-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between pt-1">
                <h6 className="font-weight-medium">No of Vehical Booking</h6>
                <h6 className="font-weight-medium">
                  {checkoutDetails.productsIds.length}
                </h6>
              </div>
              <div className="">
                <h6 className="card-title">Delivery Address :</h6>
                <p className="card-text mb-0">{userDetails.name}</p>
                <i className="card-text mb-0">
                  {checkoutDetails.deliveryAddress}
                </i>
                <p className="card-text fw-normal">
                  Phone: {userDetails.mobile}
                </p>
              </div>
            </div>
            <div className="card-footer border-top border-2 bg-transparent">
              <div className="d-flex justify-content-between mt-2 border-bottom border-2">
                <h5 className="font-weight-bold text-danger">Total Amount</h5>
                <h5 className="font-weight-bold text-danger">
                  <FaRupeeSign />
                  {checkoutDetails.AmountOfOrder.totalAmount}
                </h5>
              </div>
              <button
                className="btn btn-block btn-success my-3 text-white fs-5 fw-bolder"
                onClick={InitiatePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmAndPayNow;
