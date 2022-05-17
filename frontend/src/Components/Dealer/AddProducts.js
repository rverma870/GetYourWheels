import React,{useState,useEffect}from "react";
import axios  from "axios";
import { TiTick } from "react-icons/ti";
import { FaMinusCircle } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ProductActionCreators } from "../../State/IndexActions";
import "../../Styles/Dealer/AddProduct.css"

function AddProducts() {

  const ProductUpdateBoolen = useSelector((state) => state.UpdateBoolen);
  const ProductDetailsUpdate = useSelector((state) => state.product);
  const isLoggedIn = useSelector((state) => state.IsLoggedIn);
  
  const dispatch = useDispatch();
  const ProductActions = bindActionCreators(ProductActionCreators, dispatch);   
  // const ToggleActions = bindActionCreators(ToggleActionCreators, dispatch);


  const postAddProductUrl = `${process.env.REACT_APP_HOST_NAME}/dealer/product/add`;
  const postUpdateProductUrl = `${process.env.REACT_APP_HOST_NAME}/dealer/product/update/${ProductDetailsUpdate.id}`;
  
  const postImageUploadURL = `${process.env.REACT_APP_HOST_NAME}/dealer/uploadProductImage`;
  const postThumbnailUploadURL = `${process.env.REACT_APP_HOST_NAME}/dealer/uploadThumbnail`;

  const initialstateOfVariants = [
    {
      variantName: "",
      price: "",
      fuelType: "",
      transmissionType: "",
      engine: "",
      mileage: "",
    },
  ];

  const initialStateOfUserDetails = {
    productName: "",
    company: "",
    category: "",
    variants: [],
    startingPrice: "",
    finalPrice: "",
    image: [],
    thumbnail:"",
    discription: "",
    bhp: "",
    noOfSeats: "",
    safetyRating: "",
  };

  const [AddVariants, setAddVariants] = useState(ProductUpdateBoolen?ProductDetailsUpdate.variants:initialstateOfVariants);

  const [ProductDetails, setProductDetails] = useState(ProductUpdateBoolen?ProductDetailsUpdate:initialStateOfUserDetails);

  const [ProductThumbnail, setProductThumbnail] = useState(null);
  
  const [ProductImage, setProductImage] = useState([]);

  const [message, setMessage] = useState({
    msg:"",
    isSubmitted:false,
    isThumbnailUploaded:false,
    isImagesUploaded:false,
    error:false
  });
  
  const clearState = () => {
    setProductDetails({ ...initialStateOfUserDetails });
    setAddVariants([...initialstateOfVariants]);
  };

  useEffect(() => {
    console.log(AddVariants, " this is addvariants from addproduct useeffect")
    if(ProductUpdateBoolen){
      setProductDetails(ProductDetailsUpdate);
    }else{
      setProductDetails({ ...ProductDetails, variants:[ ...AddVariants ]});
    }
  }, [AddVariants])

  const ImageOnChangeHandler = (event)=>{

    console.log(event.target.files);
    setProductImage(event.target.files);
  };

  const ThumbnailOnChangeHandler = (event) => {

    console.log(event.target.files);
   setProductThumbnail(event.target.files[0]);
  };

  const handleOnChangeVariants = (index, event) => {
    const values = [...AddVariants];
    values[index][event.target.name] = event.target.value;
    setAddVariants(values);
    console.log(index,values);
  };

  const handleOnChange = (event) => {
    
    let name = event.target.name;
    let value = event.target.value;
    const newdata = { ...ProductDetails };
    if(name==="productName" || name==="company"){
     value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    newdata[name] = value;
    setProductDetails(newdata);
    console.log(newdata);
  };

  const handleAddFields = ()=>{

    setAddVariants([
      ...AddVariants,
      {
        variantName: "",
        price: "",
        fuelType: "",
        transmissionType: "",
        engine: "",
        mileage: ""
      },
    ]);
  }


  const handleRemoveFields = (index) => {

      const variants = [...AddVariants];
      console.log("inside removeFields");
      console.log(variants);
      if(variants.length>1){
        variants.splice(index, 1);
        setAddVariants(variants);
      }
   };

   const handleThumbnailUpload = () => {
     let file = ProductThumbnail;
     let formdata = new FormData();

     if (file != null && ProductDetails.productName!=="") {

      //removing spaces from the productName and savig the same for the thumbnail.
      let thumbnailName = ProductDetails.productName;
      thumbnailName = thumbnailName.replace(/\s+/g, "");

      formdata.append("Thumbnail", file, thumbnailName + ".jpeg");

      axios
        .post(postThumbnailUploadURL,formdata,
        {
          withCredentials: true,
        }, 
        {
          headers: {
            "Content-type": "multipart/form-data",
           }
        })
        .then((res) => {
          setProductThumbnail(null);
          setProductDetails({
            ...ProductDetails,
            thumbnail: res.data.thumbnailURL,
          });
          setMessage({
            ...message,
            isThumbnailUploaded: true,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
     }
   };  

  const handleUpload = ()=>{
    let file = ProductImage;
    let formdata = new FormData();
    // console.log(Array.from(formdata.entries()));

    if (file !== null && ProductDetails.productName!=="") {

      let i = 0;
      Array.from(file).forEach((file) => {
        formdata.append("file", file, ProductDetails.productName + i + ".jpeg");
        i++;
      });

      axios
        .post(
          postImageUploadURL,
          formdata,
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setProductImage([]);
          setProductDetails({
            ...ProductDetails,
            image: res.data,
          });
          setMessage({
            ...message,
            isImagesUploaded: true,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault();

      console.log(ProductDetails, "from handle submit");
        axios
          .post(
            ProductUpdateBoolen ? postUpdateProductUrl : postAddProductUrl,
            {
              productName: ProductDetails.productName,
              company: ProductDetails.company,
              category: ProductDetails.category,
              variants: ProductDetails.variants,
              startingPrice: ProductDetails.startingPrice,
              finalPrice: ProductDetails.finalPrice,
              image: ProductDetails.image,
              thumbnail: ProductDetails.thumbnail,
              discription: ProductDetails.discription,
              safetyRating: ProductDetails.safetyRating,
              noOfSeats: ProductDetails.noOfSeats,
              bhp: ProductDetails.bhp,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setMessage({
              ...message,
              isSubmitted: true,
              error: false,
              msg: "Vehicle Added Successfully, Thankyou!",
            });
            if(ProductUpdateBoolen){
              ProductActions.selectedProduct(ProductDetails);
              // actions.ChangeUpdateBoolenState();
            }else{
              clearState();
            }  
            
          })
          .catch((err) => {
            setMessage({
              ...message,
              error: true,
              isSubmitted: false,
              msg: err.message,
            });
          });
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="ProductDetailForm bg-image-vertical h-100 ">
          <div className="mask d-flex align-items-center h-100 py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-12">
                  <div className="card text-white" id="productCard">
                    <div className="card-body p-5">
                      {ProductUpdateBoolen ? (
                        ""
                      ) : (
                        <h1 className="mb-5 text-center">
                          Add Vehical Details
                        </h1>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12 col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="Text"
                                className="form-control"
                                name="productName"
                                value={ProductDetails.productName}
                                placeholder="Enter Vehical Name"
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label
                                htmlFor="productName"
                                className="form-label"
                              >
                                Vehicle Name
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="Text"
                                className="form-control"
                                name="company"
                                placeholder="Enter Manufacturing company"
                                value={ProductDetails.company}
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label
                                htmlFor="OwnerCompany"
                                className="form-label"
                              >
                                Owner Company
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-md-4 mb-4">
                            <div className="form-outline mb-4">
                              <select
                                name="category"
                                className="form-select"
                                value={ProductDetails.category}
                                onChange={(event) => handleOnChange(event)}
                                required
                              >
                                <option value="" disabled defaultValue>
                                  Choose...
                                </option>
                                <option>Hatchback</option>
                                <option>Premium Hatchback</option>
                                <option>Sedan</option>
                                <option>Premium Sedan</option>
                                <option>Suv</option>
                                <option>Premium Suv</option>
                              </select>
                              <label
                                htmlFor="category"
                                className="form-label select-label"
                              >
                                category
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                className="form-control"
                                name="startingPrice"
                                placeholder="Starting Price"
                                value={ProductDetails.startingPrice}
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label
                                htmlFor="PriceRange"
                                className="form-label"
                              >
                                Price Range of Vehicle in Lakhs
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                className="form-control"
                                name="finalPrice"
                                placeholder="Final Price"
                                value={ProductDetails.finalPrice}
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label
                                htmlFor="PriceRange"
                                className="form-label"
                              >
                                <i>(*Including all models)</i>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-md-4 mb-4">
                            <div className="form-outline mb-4">
                              <input
                                type="number"
                                className="form-control"
                                name="bhp"
                                placeholder="Brake Horse Power"
                                value={ProductDetails.bhp}
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label htmlFor="bhp" className="form-label">
                                BHP
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                className="form-control"
                                id="Seats"
                                name="noOfSeats"
                                placeholder="Enter Number of Seats"
                                value={ProductDetails.noOfSeats}
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label htmlFor="Seats" className="form-label">
                                Number of Seats Available
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                className="form-control"
                                min="1"
                                max="5"
                                id="safetyRating"
                                name="safetyRating"
                                placeholder="Safety Rating of Vehicle"
                                value={ProductDetails.safetyRating}
                                onChange={(event) => handleOnChange(event)}
                                required
                              />
                              <label
                                htmlFor="safetyRating"
                                className="form-label"
                              >
                                Safety Rating (Out of Five)
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <button
                            type="button"
                            className="btn btn-light me-2 mb-3"
                            name="variantRow"
                            onClick={handleAddFields}
                          >
                            <BsFillPlusCircleFill size="1.5em" /> Add Variants
                          </button>
                        </div>

                        <div className="row">
                          <h6 className="">Add Base Variant Details</h6>
                          {AddVariants.map((variantFields, index) => (
                            <div
                              className="row border py-3 px-0 mt-1 mb-5 ms-0"
                              key={index}
                            >
                              <div className="col-12 col-md-3">
                                <div className="form-outline">
                                  <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                  >
                                    Variant Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control "
                                    name="variantName"
                                    placeholder="Add variant name"
                                    value={variantFields.variantName}
                                    onChange={(event) =>
                                      handleOnChangeVariants(index, event)
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-2">
                                <div className="form-outline ">
                                  <label
                                    htmlFor="VariantPrice"
                                    className="form-label"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="price"
                                    placeholder="Add Price"
                                    value={variantFields.price}
                                    onChange={(event) =>
                                      handleOnChangeVariants(index, event)
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-2">
                                <div className="form-outline">
                                  <label
                                    htmlFor="FuelType"
                                    className="form-label"
                                  >
                                    Type of Fuel
                                  </label>
                                  <select
                                    name="fuelType"
                                    className="form-select"
                                    value={variantFields.fuelType}
                                    onChange={(event) =>
                                      handleOnChangeVariants(index, event)
                                    }
                                    required
                                  >
                                    <option value="" defaultValue disabled>
                                      Choose...
                                    </option>
                                    <option>Petrol</option>
                                    <option>Diesel</option>
                                    <option>EV</option>
                                    <option>CNG</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-12 col-md-2">
                                <div className="form-outline ">
                                  <label
                                    htmlFor="transmissionType"
                                    className="form-label"
                                  >
                                    TransmissionType
                                  </label>
                                  <select
                                    name="transmissionType"
                                    className="form-select"
                                    value={variantFields.transmissionType}
                                    onChange={(event) =>
                                      handleOnChangeVariants(index, event)
                                    }
                                    required
                                  >
                                    <option value="" disabled defaultValue>
                                      Choose...
                                    </option>
                                    <option>Manual</option>
                                    <option>Automatic</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-12 col-md-1">
                                <div className="form-outline ">
                                  <label
                                    htmlFor="engine"
                                    className="form-label"
                                  >
                                    Engine
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="engine"
                                    placeholder="cc"
                                    value={variantFields.engine}
                                    onChange={(event) =>
                                      handleOnChangeVariants(index, event)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-1">
                                <div className="form-outline ">
                                  <label
                                    htmlFor="mileage"
                                    className="form-label"
                                  >
                                    Mileage
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="mileage"
                                    placeholder="Kmpl"
                                    value={variantFields.mileage}
                                    onChange={(event) =>
                                      handleOnChangeVariants(index, event)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-1 d-flex align-items-end">
                                <div className="form-outline ">
                                  <button
                                    type="button"
                                    className="btn me-2"
                                    name="removeField"
                                    id="removeField"
                                    onClick={() => handleRemoveFields(index)}
                                  >
                                    <FaMinusCircle size="2em" color="red" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="row">
                          <div className="col-12 col-md-6 mb-4">
                            <div className="form-outline mb-4">
                              <label htmlFor="Thumbnail" className="form-label">
                                Add Thumbnail Picture of the Vehicle{" "}
                                <i>(*in jpeg only)</i>
                              </label>
                              <input
                                accept="image/*"
                                className="form-control"
                                type="file"
                                name="Thumbnail"
                                disabled={
                                  ProductDetails.productName ? "" : "disabled"
                                }
                                onChange={(event) =>
                                  ThumbnailOnChangeHandler(event)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-2 mb-4 d-flex align-items-center">
                            <div className="form-outline">
                              <button
                                type="button"
                                className="btn btn-light"
                                disabled={
                                  ProductDetails.productName &&
                                  ProductThumbnail != null
                                    ? ""
                                    : "disabled"
                                }
                                onClick={handleThumbnailUpload}
                              >
                                upload
                              </button>
                            </div>
                          </div>

                          <div className="col-12 col-md-4 mb-4 d-flex align-items-center justify-content-start">
                            <div>
                              {message.isThumbnailUploaded ? (
                                <TiTick size="3em" />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="form-outline">
                              {ProductThumbnail && (
                                <div>
                                  <img
                                    alt="not fount"
                                    width={"150px"}
                                    style={{ borderRadius: "60px" }}
                                    src={URL.createObjectURL(ProductThumbnail)}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-md-6 mb-4">
                            <div className="form-outline mb-4">
                              <label htmlFor="ImageName" className="form-label">
                                Add This vehicle Images <i>(*in jpeg only)</i>
                              </label>
                              <input
                                accept="image/*"
                                className="form-control"
                                type="file"
                                name="ImageName"
                                multiple
                                disabled={
                                  ProductDetails.productName ? "" : "disabled"
                                }
                                onChange={(event) =>
                                  ImageOnChangeHandler(event)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-2 mb-4 d-flex align-items-center">
                            <div className="form-outline">
                              <button
                                type="button"
                                className="btn btn-light"
                                disabled={
                                  ProductDetails.productName &&
                                  ProductImage.length > 0
                                    ? ""
                                    : "disabled"
                                }
                                onClick={handleUpload}
                              >
                                upload
                              </button>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 mb-4 d-flex align-items-center justify-content-start">
                            <div className="form-outline">
                              {message.isImagesUploaded && (
                                <div>
                                  <TiTick size="3em" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-5">
                          <label className="form-label" htmlFor="Discription">
                            Add Discription About The Vehicle
                          </label>
                          <textarea
                            className="form-control"
                            id="Discription"
                            rows="4"
                            name="discription"
                            placeholder="Add Discription"
                            value={ProductDetails.discription}
                            onChange={(event) => handleOnChange(event)}
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-success btn-rounded btn-block"
                        >
                          {ProductUpdateBoolen ? "Update" : "Submit"}
                        </button>
                        {message.isSubmitted ? (
                          <div className="row mt-4 bg-success">
                            <div className="col-12 col-md-6 py-2">
                              <div className="form-outline  ">
                                <i className="text-white ">{message.msg}</i>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {message.error ? (
                          <div className="row mt-4 bg-success">
                            <div className="col-12 col-md-6 py-2">
                              <div className="form-outline  ">
                                <i className="text-white ">{message.msg}</i>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* <div className="row mt-4 bg-success">
                        <div className="col-12 col-md-6 py-2">
                          <div className="form-outline  ">
                            <i className="text-white ">{message.msg}</i>
                          </div>
                        </div>
                      </div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default AddProducts;
