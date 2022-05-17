import React, { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductActionCreators } from "../../State/IndexActions";
import { bindActionCreators } from "redux";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import ProductLayout from "./ProductLayout";

const MostSearchVehicleCarousel = () => {

  const SelectedProduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);

  const [category, setCategory] = useState(
    SelectedProduct.category === "" ? "Hatchback" : SelectedProduct.category
  );

  const FetchProductCategoryURL = `${process.env.REACT_APP_HOST_NAME}/product/get/AllByCategory/${category}`;

  const fetchProducts = async () => {
    await axios
      .get(
        FetchProductCategoryURL
      )
      .then((res) => {
        ProductActions.setCategoryOfProducts(res.data);
      })
      .catch((err) => {
        console.error(err, "Error form MostSearchedVehicalCarousel");
      });
  };

  useEffect(() => {

    fetchProducts();
    // return () => {
    //   ProductActions.removeSetProduct();
    // };
  }, [category, SelectedProduct]);

  const products = useSelector((state) => state.CategoryOfProducts.categoryOfProducts);

  const renderList = products.map((product, index) => {
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
         <ProductLayout  
          id={id}
          key={index}
          index={index}
          title={productName}
          startingPrice={startingPrice}
          finalPrice={finalPrice}
          thumbnail={thumbnail}
          category={category}
          company={company}/>
    );
  });

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
  ];
  return (
    <>
      <div className="ProductCarousel container border my-4 rounded-3">
        {SelectedProduct.id === "" ? (
          <h5 className="ProductCarouselHeading display-6 pt-2 mb-0 ms-2">
            The Most Searched Cars
          </h5>
        ) : (
          <h5 className="ProductDetailHeading display-6 pt-2 mb-0 ms-2">
            Similar Cars
          </h5>
        )}

        <hr className="my-2" />
        {SelectedProduct.id === "" ? (
          <ul className="MostSearchCarosuelNav nav mb-2 mx-5 bg-secondary rounded">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link active text-white"
                aria-current="page"
                onClick={() => setCategory("Hatchback")}
              >
                Hatchback
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link active text-white"
                aria-current="page"
                onClick={() => setCategory("Sedan")}
              >
                Sedan
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link active text-white"
                aria-current="page"
                onClick={() => setCategory("Suv")}
              >
                Suv
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link active text-white"
                aria-current="page"
                onClick={() => setCategory("Muv")}
              >
                MUV
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}

        <Carousel breakPoints={breakPoints} key="" className="Carousel">
          {renderList}
        </Carousel>
      </div>
    </>
  );
};

export default MostSearchVehicleCarousel;
