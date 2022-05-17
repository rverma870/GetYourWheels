import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

function CartButton() {

  const isLoggedIn = useSelector((state) => state.IsLoggedIn);


  return (
    <>
      <Link
        className="NavbarCartButton btn btn me-2 text-white"
        type="button"
        data-bs-toggle={isLoggedIn ? "" : "modal"}
        data-bs-target="#LoginModal"
        to={"/User/Cart"}
        // onClick={isLoggedIn ? handleLogout : null}
      >
        <FaCartPlus size={"4vh"} />
        <div> Cart</div>
      </Link>
    </>
  );
}

export default CartButton;
