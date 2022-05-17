import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProductActionCreators } from "../../State/IndexActions";
import { FilterActionCreator } from "../../State/IndexActions";
import { bindActionCreators } from "redux";
import axios from "axios";
import "../../Styles/ListByBrand/ListByBrand.css";
import Filter from "./Filter";
import ProductLayout from "../HomePage/ProductLayout";

function ListProductByBrand() {

  const { brandName } = useParams();

  const products = useSelector((state) => state.BrandsOfProducts.brandsOfProducts);
  const FilterState = useSelector((state) => state.Filter);

  const dispatch = useDispatch();
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);
  const FilterActions = bindActionCreators(FilterActionCreator, dispatch);

  const FetchProductByBrandURL = `${process.env.REACT_APP_HOST_NAME}/product/get/AllByCompany/${brandName}`;

  const fetchProductsByBrand = async () => {
    await axios
      .get(FetchProductByBrandURL)
      .then((res) => {
        console.log(res.data);
        ProductActions.setBrandOfProducts(res.data);
      })
      .catch((err) => {
        console.error(err, "Error form List Product by brand");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductsByBrand();
    return () => {
      ProductActions.removeBrandOfProducts();
    };
  }, []);



  const renderProducts = products.map((product, index) => {
    const {
      id,
      productName,
      company,
      category,
      startingPrice,
      finalPrice,
      thumbnail,
    } = product;

    return (
      <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={index}>
        <ProductLayout
          id={id}
          key={index}
          index={index}
          title={productName}
          startingPrice={startingPrice}
          finalPrice={finalPrice}
          thumbnail={thumbnail}
          category={category}
          company={company}
        />
      </div>
    );
  });

  return (
    <>
      <div className="container-fluid pt-4 bg-white">
        <div className="row px-xl-5">
          <Filter brandName={brandName} />

          {/* <!-- Shop Product Start --> */}
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-end mb-4">
                  <div className="dropdown">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <option
                          className="dropdown-item"
                          onClick={() =>
                            FilterActions.setFilter({
                              ...FilterState,
                              sortBy: "ASC",
                            })
                          }
                        >
                          Low To High
                        </option>
                      </li>
                      <li>
                        <option
                          className="dropdown-item"
                          onClick={() =>
                            FilterActions.setFilter({
                              ...FilterState,
                              sortBy: "DESC",
                            })
                          }
                        >
                          High To Low
                        </option>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
                          
              {renderProducts}

              {/* <div className="col-12 pb-1">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mb-3">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
            </div>
          </div>
          {/* <!-- Shop Product End --> */}
        </div>
      </div>
    </>
  );
}

export default ListProductByBrand;
