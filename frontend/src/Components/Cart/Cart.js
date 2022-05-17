import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartProductLayout from "./CartProductLayout";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CartActionCreators } from "../../State/IndexActions";
import { CheckOutActionCreator } from "../../State/IndexActions";
import { bindActionCreators } from "redux";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";


function Cart() {

  const isLoggedIn = useSelector((state) => state.IsLoggedIn);
  const userDetails = useSelector((state) => state.UserDetail);
  const Cart = useSelector((state) => state.Cart);
  const checkoutOBJ = useSelector((state) => state.CheckOutOBJ);  

  const dispatch = useDispatch();
  const cartAction = bindActionCreators(CartActionCreators, dispatch);
  const CheckOutActions = bindActionCreators(CheckOutActionCreator, dispatch);    

  const FetchUserCartDetailURL = `${process.env.REACT_APP_HOST_NAME}/user/getCart/${userDetails.cartId}`;

  const fetchCartDetail = async () => {
    await axios
      .get(FetchUserCartDetailURL, { withCredentials: true })
      .then((res) => {
        cartAction.setCart({
          products: res.data.products,
          subTotal: res.data.products.length * 100,
          gstAmount: res.data.products.length * 100 * 0.18,
          totalAmount: res.data.products.length * 100 + res.data.products.length * 100 * 0.18,
        });
      })
      .catch((err) => {
        console.error(err, "fetchCardDetail Error form Cart.js");
      });
  };

  const deleteProductFromCart = async (productId) => {
    const DeleteCartProductURL = `${process.env.REACT_APP_HOST_NAME}/user/deleteFromCart/${userDetails.cartId}/${productId}`;
    await axios
      .delete(DeleteCartProductURL, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        let newCart = Cart.products.filter((e) => e.id !== productId);
        let noOfProductInCart = newCart.length;
        cartAction.setCart({
          ...Cart,
          products: newCart,
          subTotal: noOfProductInCart * 100,
          gstAmount: noOfProductInCart * 100 * 0.18,
          totalAmount: noOfProductInCart * 100 + noOfProductInCart * 100 * 0.18
        });
      })
      .catch((err) => {
        console.error(err, "deleteProductFromCart Error form Cart.js");
      });
  };

  useEffect(() => {
    if(isLoggedIn && userDetails.cartId!==""){
      fetchCartDetail();
    }

    // return () => {
    //   cartAction.removeSetCart();
    // };
  }, [isLoggedIn,userDetails]);

  let productIds = [];

  const setCheckoutDetails = ()=>{

    if(productIds.length!==0){

      CheckOutActions.setCheckOut({
        ...checkoutOBJ,
        amount: {
          ...checkoutOBJ.AmountOfOrder,
          subTotal: Cart.subTotal,
          gst: Cart.gstAmount,
          totalAmount: Cart.totalAmount,
        },
        userId: userDetails.id,
        productsIds: productIds,
        address: "",
      });
    }
  };

 
  const renderCart = Cart.products.map((product, index) => {
    const {
      id,
      productName,
      company,
      category,
      dealerId,
      startingPrice,
      finalPrice,
      safetyRating,
      thumbnail,
    } = product;

    productIds.push(id);

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
        handleDeleteProduct={deleteProductFromCart}
        removebutton={true}
      />
    );
  });

  return (
    <>
      {isLoggedIn ? (
        <div className="container-fluid pt-3">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5 p-3">
              <div className="card">
                <div className="card-header">
                  <h1 className="fs-4 mb-0">MY CART</h1>
                </div>
                <div className="card-body">
                  {Cart.products.length > 0 ? (
                    renderCart
                  ) : (
                    <h1>Your Cart Is Empty</h1>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-3">
              <div className="card border-3 mb-5">
                <div className="card-header border-0">
                  <h4 className="font-weight-semi-bold m-0">CART SUMMARY</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <h6 className="font-weight-medium">Subtotal</h6>
                    <h6 className="font-weight-medium">
                      <FaRupeeSign />
                      {Cart.subTotal}
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between mb-3 pt-1">
                    <h6 className="font-weight-medium">GST(18%)</h6>
                    <h6 className="font-weight-medium">
                      <FaRupeeSign />
                      {Cart.gstAmount}
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Convenience Fee</h6>
                    <h6>
                      <span className="fs-6 font-weight-medium text-decoration-line-through">
                        <FaRupeeSign />
                        99
                      </span>
                      <span className="text-success ms-1">Free</span>
                    </h6>
                  </div>
                </div>
                <div className="card-footer border-top border-2 bg-transparent">
                  <div className="d-flex justify-content-between mt-2 border-bottom border-2">
                    <h5 className="font-weight-bold">Total Amount</h5>
                    <h5 className="font-weight-bold text-danger">
                      <FaRupeeSign /> {Cart.totalAmount}
                    </h5>
                  </div>
                  <Link
                    className="btn btn-block btn-secondary my-3 text-white fs-5 fw-bolder"
                    to={"/User/CheckoutAddress"}
                    onClick={setCheckoutDetails}
                  >
                    Proceed To Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-5 d-flex flex-column justify-content-center">
          <div className="card">
            <div className="card-header text-center">
              <h2>PLEASE LOGIN FIRST</h2>
            </div>
            <div className="card-body text-center">
              <span className="fs-5 me-3">Click Here To Login</span>
              <button
                className="btn btn-primary me-2 text-white"
                type="button"
                data-bs-toggle={isLoggedIn ? "" : "modal"}
                data-bs-target="#LoginModal"
              >
                Login <FiLogIn />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
