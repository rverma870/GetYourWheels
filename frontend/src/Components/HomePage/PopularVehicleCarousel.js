import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductActionCreators } from "../../State/IndexActions";
import { bindActionCreators } from "redux";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import ProductLayout from "./ProductLayout";

const PopularVehicleCarousel = () => {
  
  const dispatch = useDispatch();
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);

  const FetchPopularProductURL = `${process.env.REACT_APP_HOST_NAME}/product/get/AllBySellCount`;
 
  const fetchProducts = async () => {
    await axios
      .get(
        FetchPopularProductURL
      )
      .then((res) => {
        ProductActions.setPopularProducts(res.data);
      })
      .catch((err) => {
        console.error(err, "Error form PopularVehicalCarousel");
      });
  };
  
  useEffect(() => {
    fetchProducts();
    // return () => {
    //   ProductActions.removeSetProduct();
    // };
  }, []);

  const products = useSelector((state) => state.PopularProducts.popularProducts);
  
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
      <ProductLayout  id={id}
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
    { width: 600, itemsToShow: 2 },
    { width: 750, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
  ];

  return (
    <>
      <div className="ProductCarousel container border mb-5 mt-4 pt-2 rounded-3">
        <h5 className="ProductCarouselHeading display-6">Recommended Popular Cars For You</h5>
        <hr className="mt-2 mb-4" />
        <Carousel breakPoints={breakPoints} className="Carousel">
          {renderList}
        </Carousel>
      </div>
    </>
  );
};

export default PopularVehicleCarousel;
