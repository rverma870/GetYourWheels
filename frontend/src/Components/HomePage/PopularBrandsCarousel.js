import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductActionCreators } from "../../State/IndexActions";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";

const PopularBrandsCarousel = () => {
  const dispatch = useDispatch();
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);

  const FetchBrands_Of_ProductURL = `${process.env.REACT_APP_HOST_NAME}/product/get/BrandImages`;

  const fetchProducts = async () => {
    await axios
      .get(
        FetchBrands_Of_ProductURL
      )
      .then((res) => {
        ProductActions.setBrandOfProducts(res.data);
      })
      .catch((err) => {
        console.error(err, "Error form PopularBrandsCarousel.js");
      });
  };

  useEffect(() => {
    // console.log("this is propularBrandsCarousel.js useeffect");
    fetchProducts();
  }, []);

  const brands = useSelector((state) => state.BrandsOfProducts.brandsOfProducts);

  const renderList = brands.map((brand, index) => {
    
    const {
      // id,
      brandName,
      brandImageURI,
    } = brand;

    return (
      <div className="productlayout card product-item border-0" key={index}>
        <Link
          to={`/Brand/${brandName}`}
          className="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
        >
          <img
            className="BrandThumbnail img-fluid w-100"
            src={brandImageURI}
            alt={brandName}
          />
        </Link>
        <div className="card-footer d-flex justify-content-center pb-0">
          <h5 className="card-title ">{brandName}</h5>
        </div>
      </div>
    );
  });

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 2 },
    { width: 500, itemsToShow: 3 },
    { width: 600, itemsToShow: 4 },
    { width: 900, itemsToShow: 5 },
  ];
  return (
    <>
      <div className="ProductCarousel container border my-5 pt-2 rounded-3">
        <h5 className="ProductCarouselHeading display-6">Popular Brands</h5>
        <hr className="mt-2 mb-4" />
        <Carousel breakPoints={breakPoints} key="" className="Carousel">
          {renderList}
        </Carousel>
        {/* <hr className="my-0" />
        <div className="py-3 ms-4">
          <a className="text-decoration-none" href="#">
            view All Brands
          </a>
        </div> */}
      </div>
    </>
  );
};

export default PopularBrandsCarousel;
