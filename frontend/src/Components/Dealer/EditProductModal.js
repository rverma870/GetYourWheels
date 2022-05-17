import React, { useEffect } from "react";
import axios from "axios";
import AddProducts from "./AddProducts";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ToggleActionCreators,ProductActionCreators } from "../../State/IndexActions";

function EditProductModal({ProductId}) {

  // console.log(ProductId, " this is product id from editProductModal.js");

  const ProductUpdateBoolen = useSelector((state) => state.UpdateBoolen);
  const ProductDetailsUpdate = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const ToggleActions = bindActionCreators(ToggleActionCreators, dispatch);
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);  

  const FetchProductDetailURL = `${process.env.REACT_APP_HOST_NAME}/product/get/${ProductId}`;

  const fetchProductDetails = async()=>{

         await axios
           .get(FetchProductDetailURL, 
            { withCredentials: true }
            )
           .then((res) => {
             ProductActions.selectedProduct(res.data);
           })
           .catch((err) => {
             console.error(err, "Error form ProductListing ");
           });
  };

    useEffect(() => {

      if(ProductUpdateBoolen){
        fetchProductDetails();
      }
      
    }, [ProductUpdateBoolen]);
    


  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        id="EditProductModal"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title ms-auto">Update Vehical Details</h3>

              <button
                type="button"
                className="btn-close"
                id="modalCloseButton"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  ProductActions.removeSelectedProduct();
                  ToggleActions.ChangeUpdateBoolenState();
                }}
              ></button>
            </div>
            <div className="modal-body">
              {ProductUpdateBoolen && ProductDetailsUpdate.productName!=="" ? (
                <AddProducts />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProductModal;
