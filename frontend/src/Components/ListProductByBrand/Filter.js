import React , {useEffect} from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ProductActionCreators,FilterActionCreator } from "../../State/IndexActions";
import { bindActionCreators } from "redux";
import { FaRupeeSign } from "react-icons/fa";

function Filter({brandName}) {

  const FilterState = useSelector((state) => state.Filter);

  const dispatch = useDispatch();
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);
  const FilterActions = bindActionCreators(FilterActionCreator, dispatch);

  let FetchProductByFilterURI = `${process.env.REACT_APP_HOST_NAME}/product/get/filterProduct/${brandName}/${FilterState.startingPrice}/${FilterState.finalPrice}/${FilterState.bodyType}/${FilterState.sortBy}`;

  useEffect(() => {
    console.log(FilterState);
    console.log(FetchProductByFilterURI);

      if(!(FilterState.bodyType==="none"&& FilterState.sortBy==="none" && FilterState.startingPrice==="0" && FilterState.finalPrice==="0")){
        
        axios
          .get(FetchProductByFilterURI)
          .then((res) => {
            console.log(res.data, " this is from filter.js");
            ProductActions.setBrandOfProducts(res.data);
          })
          .catch((err) => {
            console.error(err, "Error form filter.js");
          });
      }

      // return () => {
      //   setFilterState(filterInitialState);
      // };
  }, [FilterState]);
  

  const handleOnChange = (e) => {
    let name = e.target.name;

    if (name === "priceFilter") {
      const value = e.target.value.split(",");
      FilterActions.setFilter({
        ...FilterState,
        startingPrice: value[0],
        finalPrice: value[1],
      });
    } else if (name === "categoryFilter") {
      const value = e.target.value;
      FilterActions.setFilter({ ...FilterState, bodyType: value });
    } else if (name === "ResetFilter") {
      FilterActions.removeFilter();
    }
  };

  return (
    <>
      <div className="col-lg-3 col-md-12 pt-1 my-3">
        <div className="border p-2">
          <div className="border-bottom mb-3 pb-3 pe-2">
            <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>
            <form>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  name="priceFilter"
                  className="FilterRadio form-check-input "
                  id="price-1"
                  value={"0,5"}
                  checked={
                    FilterState.startingPrice === "0" &&
                    FilterState.finalPrice === "5"
                  }
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="price-1">
                  Upto <FaRupeeSign />5 Lakhs*
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  name="priceFilter"
                  className="FilterRadio form-check-input"
                  id="price-2"
                  value={"5,10"}
                  checked={
                    FilterState.startingPrice === "5" &&
                    FilterState.finalPrice === "10"
                  }
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="price-2">
                  Between <FaRupeeSign />
                  5-10 Lakhs*
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  name="priceFilter"
                  className="FilterRadio form-check-input"
                  id="price-3"
                  value={"10,15"}
                  checked={
                    FilterState.startingPrice === "10" &&
                    FilterState.finalPrice === "15"
                  }
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="price-3">
                  Between <FaRupeeSign />
                  10-15 Lakhs*
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  name="priceFilter"
                  className="FilterRadio form-check-input"
                  id="price-1"
                  value={"15,20"}
                  checked={
                    FilterState.startingPrice === "15" &&
                    FilterState.finalPrice === "20"
                  }
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="price-1">
                  Between <FaRupeeSign />
                  15-20 Lakhs*
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  name="priceFilter"
                  className="FilterRadio form-check-input"
                  id="price-1"
                  value={"20,9999"}
                  checked={
                    FilterState.startingPrice === "20" &&
                    FilterState.finalPrice === "9999"
                  }
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="price-1">
                  Above <FaRupeeSign />
                  20 Lakhs*
                </label>
              </div>
            </form>
          </div>

          <div className="pb-2 pe-2">
            <h5 className="font-weight-semi-bold mb-4">Filter by BodyType</h5>
            <form>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  className="FilterRadio form-check-input "
                  id="category-1"
                  name="categoryFilter"
                  value={"Hatchback"}
                  checked={FilterState.bodyType === "Hatchback"}
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="category-1">
                  Hatchback
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  className="FilterRadio form-check-input "
                  id="category-2"
                  name="categoryFilter"
                  value={"Suv"}
                  checked={FilterState.bodyType === "Suv"}
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="category-2">
                  Suv
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  className="FilterRadio form-check-input"
                  id="category-3"
                  name="categoryFilter"
                  value={"Sedan"}
                  checked={FilterState.bodyType === "Sedan"}
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="category-3">
                  Sedan
                </label>
              </div>
              <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="radio"
                  className="FilterRadio form-check-input"
                  id="category-4"
                  name="categoryFilter"
                  value={"Muv"}
                  checked={FilterState.bodyType === "Muv"}
                  onChange={handleOnChange}
                />
                <label className="custom-control-label" htmlFor="category-4">
                  MUV
                </label>
              </div>
            </form>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary mt-3 "
              name="ResetFilter"
              value="ResetFilter"
              onClick={handleOnChange}
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
