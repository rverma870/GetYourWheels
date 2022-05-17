import React from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ProductActionCreators } from "../../State/IndexActions";

function DeleteConfirmationModal({ ProductId ,Index}) {

    // console.log(ProductId , " & ", Index, " this is productid and index from deleteConfirmationmodal.js")

    const ShowProducts = useSelector((state) => state.AllProducts.products);
    const dispatch = useDispatch();
    const ShowProductActions = bindActionCreators(ProductActionCreators, dispatch);


    const DeleteProductURL = `${process.env.REACT_APP_HOST_NAME}/dealer/delete_product/${ProductId}`;

    const handleDeleteProduct = async () => {
      await axios
        .delete(DeleteProductURL, { withCredentials: true })
        .then((res) => {
            ShowProductActions.setProducts(ShowProducts.filter((e) => e.id !== ProductId));
        })
        .catch((err) => {
          console.error(err, "Error form deleteConfirmationModal.js");
        });
    };


  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        id="DeleteProductModal"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title ">Confirmation</h3>

              <button
                type="button"
                className="btn-close"
                id="modalCloseButton"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Vehical?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>handleDeleteProduct()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmationModal;
