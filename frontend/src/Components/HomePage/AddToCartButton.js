import React, { useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Popover, PopoverBody } from "reactstrap";


function AddToCartButton({handleAddToCart}) {
  
   
  const isLoggedIn = useSelector((state) => state.IsLoggedIn); 


  const [popoverState, setPopoverState] = useState(false);

  const togglePopover=()=> {
    if(isLoggedIn){
      setPopoverState((PrevPopoverState)=>!PrevPopoverState);
  
      setTimeout(() => {
          setPopoverState((PrevPopoverState) => !PrevPopoverState);
      }, 1000);
    }
  }

  return (
    <>
      <button
        type="button"
        id="AddToCartPopover"
        className="ProductLayoutButton btn btn-sm text-dark p-0"
        data-bs-toggle={isLoggedIn ? "" : "modal"}
        data-bs-target="#LoginModal"
        to={"/User/Cart"}
        onClick={() => handleAddToCart()}
      >
        <BsCartCheckFill size={"1.2rem"} /> Add To Cart
      </button>

      <Popover
        placement="bottom"
        isOpen={popoverState}
        target="AddToCartPopover"
        toggle={togglePopover}
      >
        <PopoverBody>Product Added</PopoverBody>
      </Popover>
    </>
  );
}

export default AddToCartButton;
