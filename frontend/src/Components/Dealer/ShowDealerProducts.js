import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import EditProductModal from "./EditProductModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ToggleActionCreators,
  ProductActionCreators,
} from "../../State/IndexActions";

function ShowDealerProducts() {
  const ProductUpdateBoolen = useSelector((state) => state.UpdateBoolen);
  const ShowProducts = useSelector((state) => state.AllProducts.products);
  const isLoggedIn = useSelector((state) => state.IsLoggedIn);

  const dispatch = useDispatch();
  const ToggleActions = bindActionCreators(ToggleActionCreators, dispatch);
  const ShowProductActions = bindActionCreators(
    ProductActionCreators,
    dispatch
  );

  const url = `${process.env.REACT_APP_HOST_NAME}/dealer/getAllProducts`;

  const [productIdforUpdate, setProductIdforUpdate] = useState({
    id: "",
    index: "",
  });

  const fecthMyApi = useCallback(async (url) => {
    await axios
      .get(url, { withCredentials: true })
      .then((res) => {
        ShowProductActions.setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fecthMyApi(url);

    return () => {
      ShowProductActions.removeSetProduct();
    };
  }, [ProductUpdateBoolen]);

  const passIdToModal = (id, index) => {
    setProductIdforUpdate({ ...productIdforUpdate, id: id, index: index });
  };

  const renderProductList = ShowProducts.map((p, index) => (
    <tr key={index}>
      <td className="pt-3-half">{index + 1}</td>
      <td className="pt-3-half">{p.productName}</td>
      <td className="pt-3-half">{p.company}</td>
      <td className="pt-3-half">{p.category}</td>
      <td className="pt-3-half">
        <select className="form-select">
          {p.variants.map((subItem, index) => (
            <option key={index}>{subItem.variantName}</option>
          ))}
        </select>
      </td>
      <td className="pt-3-half">
        {p.startingPrice}-{p.finalPrice} Lakhs
      </td>
      <td className="pt-3-half">{p.sellCount}</td>
      <td className="pt-3-half">
        <button
          className="btn btn pe-0"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#EditProductModal"
          onClick={() => {
            ToggleActions.ChangeUpdateBoolenState();
            passIdToModal(p.id, index);
          }}
        >
          <i>
            <FaEdit />
          </i>
        </button>
        <button
          className="btn btn pe-0 waves-effect waves-light right"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#DeleteProductModal"
          onClick={() => {
            passIdToModal(p.id, index);
          }}
        >
          <i>
            <AiFillDelete />
          </i>
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      {isLoggedIn ? (
        <div>
          <div className="card">
            <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
              Your Vehical List
            </h3>
            <div className="card-body">
              <div id="table" className="table-editable">
                <span className="table-add float-right mb-3 mr-2">
                  <a href="#!" className="text-success">
                    <i className="fas fa-plus fa-2x" aria-hidden="true"></i>
                  </a>
                </span>
                <table className="table table-bordered table-responsive-md table-responsive-sm table-striped text-center">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Company</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">Variants</th>
                      <th className="text-center">Price Range</th>
                      <th className="text-center">Sell Count</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{renderProductList}</tbody>
                </table>
              </div>
            </div>
          </div>
          <EditProductModal ProductId={productIdforUpdate.id} />
          <DeleteConfirmationModal
            ProductId={productIdforUpdate.id}
            Index={productIdforUpdate.index}
          />
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

export default ShowDealerProducts;
