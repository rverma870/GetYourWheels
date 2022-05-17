import React, {useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ProductActionCreators } from "../../State/IndexActions";
import Carousel from "react-elastic-carousel";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import {SiGodotengine} from "react-icons/si";
import { GiGearStick, GiCarSeat } from "react-icons/gi";
import { FaGasPump, FaRupeeSign } from "react-icons/fa";
import { AiFillCar, AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoFlash, IoSpeedometer } from "react-icons/io5";
import MostSearchVehicleCarousel from "../HomePage/MostSearchVehicleCarousel";
import "../../Styles/ProductDetail/ProductDetail.css"

const ProductDetail = () => {

  const { productId } = useParams();


  const isLoggedIn = useSelector((state) => state.IsLoggedIn);
  const productDetails = useSelector((state) => state.product);
  const userDetails = useSelector((state) => state.UserDetail);

  const dispatch = useDispatch();
  const productActions = bindActionCreators(ProductActionCreators, dispatch);

  

  const getProductDetailURI = `${process.env.REACT_APP_HOST_NAME}/product/get/${productId}`;
  const addToCartURI = `${process.env.REACT_APP_HOST_NAME}/user/addToCart/${userDetails.cartId}/${productId}`;

  const fetchProductDetails = async () => {
    await axios
      .get(getProductDetailURI)
      .then((res) => {
        productActions.selectedProduct(res.data);
      })
      .catch((err) => {
        console.log("error from productDetails.js", err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId && productId !== "") {
      fetchProductDetails();
    }

    return () => {
      productActions.removeSelectedProduct();
    };
  }, [productId]);



  const handleAddToCart = async()=>{
    if(userDetails.cartId!==""){
      await axios
        .get(addToCartURI, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error("error from handleAddToCart of productDetails.js", err);
        });
    }
  };


  // const { id, title, price, image, description, category,rating:{rate,count}={}} = product;
  const {
    // id,
    productName,
    image,
    discription,
    company,
    category,
    variants,
    bhp,
    // dealerId,
    startingPrice,
    finalPrice,
    noOfSeats,
    rateCount,
    rating,
    safetyRating,
    // thumbnail,
  } = productDetails;

  const renderVariantList = variants.map((p, index) => (
    <tr key={index}>
      <td className="pt-3-half">{index + 1}</td>
      <td className="pt-3-half">{p.variantName}</td>
      <td className="pt-3-half"><FaRupeeSign /> {p.price}</td>
      <td className="pt-3-half">{p.engine}cc, {p.transmissionType}, {p.fuelType}, {p.mileage}kmpl </td>
    </tr>
  ));



  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 1 },
    { width: 600, itemsToShow: 1 },
    { width: 900, itemsToShow: 1 },
  ];

  return (
    <>
      {Object.keys(productDetails).length === 0 ? (
        <div>...Loding</div>
      ) : (
        <>
          <div className="py-4 px-1 bg-white mb-3 mx-0">
            <div className="row px-xl-4">
              <div className="col-lg-7 border pt-3 ">
                <Carousel breakPoints={breakPoints} key="" className="Carousel">
                  {image.map((i, index) => (
                    <img
                      key={index}
                      src={i}
                      alt=""
                      className="img-responsive"
                      width="1000rem"
                      height="auto"
                      // style={{ borderRadius: "20%" }}
                    />
                  ))}
                </Carousel>
              </div>

              <div className="col-lg-5 ps-4 ">
                <div>
                  <h3 className="ProductDetailHeading font-weight-semi-bold fs-2 mb-0">
                    {company.toUpperCase()} {productName.toUpperCase()} 
                  </h3>
                  <div className="d-flex mb-3">
                    {rating ? (
                      <ReactStars size={20} value={rating} edit={false} />
                    ) : (
                      ""
                    )}
                    <small className="pt-1 ms-2">({rateCount} Reviews)</small>
                  </div>

                  <div className="mt-3">
                    <h1 className="ProductDetailHeading fs-4">PRICE:</h1>
                    <h3 className="font-weight-semi-bold mb-0 ">
                      <FaRupeeSign size="1em" />
                      <span className="ms-1">
                        {startingPrice}-{finalPrice} Lakhs*
                      </span>
                    </h3>
                    <p className="text-muted fs-6 fw-lighter fst-italic">
                      (*Ex-showroom Price in Indore)
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="card mt-5"
                    style={{ width: "25rem", height: "15rem" }}
                  >
                    <div className="card-header fs-4 fw-bold text-center text-white bg-secondary border-0">
                      TRY THIS CAR
                    </div>
                    <div className="card-body text-center ">
                      <span className="fw-normal fs-5 ">
                        Take trial of
                        <span className="mx-1 font-weight-semi-bold fw-bolder">
                          {company} {productName}
                        </span>
                        at Your DoorStep
                      </span>
                      <span className="fw-normal fs-5 ms-1">
                        by just paying <FaRupeeSign />
                        <span className="fs-4 fw-bold">100</span>
                      </span>
                    </div>

                    <div className="card-footer py-3 text-center bg-secondary border-0">
                      <Link
                        type="button"
                        className="btn btn-light px-5 fs-3"
                        id="BookTrialButton"
                        data-bs-toggle={isLoggedIn ? "" : "modal"}
                        data-bs-target="#LoginModal"
                        to={"/User/Cart"}
                        onClick={() => handleAddToCart()}
                      >
                        Book Trail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="container bg-white my-4 p-3 rounded"
            style={{ maxWidth: "75rem" }}
          >
            <h1 className="ProductDetailHeading fs-4 pb-3 mb-0">
              KEY SPECS OF {productName.toUpperCase()}
            </h1>
            <hr className="m-0" />
            <div className=" px-4 py-4 d-flex justify-content-between text-muted">
              <div className="text-center">
                <IoSpeedometer size="4em" />

                <div>Mileage (upto)</div>
                <div className="text-dark fw-bolder">
                  {variants.length > 0 ? variants[0].mileage : ""} kmpl
                </div>
              </div>
              <div className="text-center">
                <SiGodotengine size="4em" />
                <div>Engine (upto)</div>
                <div className="text-dark fw-bolder">
                  {variants.length > 0 ? variants[0].engine : ""} cc
                </div>
              </div>
              <div className="text-center">
                <IoFlash size="4em" />
                <div>BHP</div>
                <div className="text-dark fw-bolder">{bhp}</div>
              </div>

              <div className="text-center">
                <GiGearStick size="4em" />
                <div>Transmission</div>
                <div className="text-dark fw-bolder">
                  {variants.length > 0 ? variants[0].transmissionType : ""}
                </div>
              </div>

              <div className="text-center">
                <FaGasPump size="4em" />
                <div>Fuel Type</div>
                <div className="text-dark fw-bolder">
                  {variants.length > 0 ? variants[0].fuelType : ""}
                </div>
              </div>
              <div className="text-center">
                <GiCarSeat size="4em" />
                <div>Seats</div>
                <div className="text-dark fw-bolder">{noOfSeats}</div>
              </div>
              <div className="text-center">
                <AiFillCar size="4em" />
                <div>Body Type</div>
                <div className="text-dark fw-bolder">{category}</div>
              </div>
              <div className="text-center">
                <AiOutlineSafetyCertificate size="4em" />
                <div>Safty Rating</div>
                <div className="text-dark fw-bolder">{safetyRating}</div>
              </div>
            </div>
            <hr className="mt-0 " />
            {/* <div className="ms-2 pt-2">
              <a className="text-decoration-none" href="#">
                Specs and Features
              </a>
            </div> */}
          </div>

          <div
            className="container bg-white p-4 my-4 rounded"
            style={{ maxWidth: "75rem" }}
          >
            <h1 className="ProductDetailHeading fs-4 pb-3 mb-0">
              {productName.toUpperCase()} VARIANTS
            </h1>
            <p>{discription}</p>

            <table className="table table-bordered table-responsive-md table-secondary table-striped text-center">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Variant</th>
                  <th className="text-center">Ex-Showroom Price</th>
                  <th className="text-center">Details</th>
                </tr>
              </thead>
              <tbody>{renderVariantList}</tbody>
            </table>
          </div>
          {productDetails.id !== "" ? <MostSearchVehicleCarousel /> : ""}
        </>
      )}
    </>
  );
};

export default ProductDetail;
