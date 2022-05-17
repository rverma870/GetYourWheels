import React, { useState, useEffect } from "react";
import "../../Styles/Checkout/DeliveryAddress.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { GrValidate } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { UserDetailGlobal} from "../../State/IndexActions";
import { CheckOutActionCreator } from "../../State/IndexActions";
import axios from "axios";

function DeliveryAddress() {

  const userDetails = useSelector((state) => state.UserDetail);
  const checkoutOBJ = useSelector((state) => state.CheckOutOBJ);

  const dispatch = useDispatch();
  const UserDetailActions = bindActionCreators(UserDetailGlobal, dispatch); 
  const CheckOutActions = bindActionCreators(CheckOutActionCreator, dispatch); 

  const initialDropDown = {
    country: [],
    states: [],
    cities: [],
    selectedCountryCode: "",
    selectedStateCode: "",
    seletedPinCode: "",
  };

  const [dropDownData, setDropDownData] = useState(()=>initialDropDown);

  const initialAddressState = {
    country:"",
    state:"",
    city:"",
    houseNo:"",
    street:"",
    pincode:"",
    landmark:""
  }

  const [newAddress, setnewAddress] = useState(()=>initialAddressState);

  const [message, setMessage] = useState({
    msg : "",
    error: false,
    isvalidated:false,
  });

  const clearState = () => {
    setnewAddress({ ...initialAddressState });
    setMessage({msg:"",error:false,isvalidated:false});
    setDropDownData({...initialDropDown});
  };

  const FetchCountryListURL = `https://api.countrystatecity.in/v1/countries`;
  const AddNewAddressURL = `${process.env.REACT_APP_HOST_NAME}/user/addAddress/${userDetails.id}`;

   const fetchAllCountry = async()=>{

    console.log(process.env.REACT_APP_ADDRESS_API_KEY);
    await axios
      .get(FetchCountryListURL, {
        headers: {
          "X-CSCAPI-KEY": process.env.REACT_APP_ADDRESS_API_KEY,
        },
      })
      .then((res) => {
        setDropDownData({ ...dropDownData, country: res.data });
      })
      .catch((err) => {
        console.error(err, "Error form FetchAllCountry DeliveryAddress.js");
      });
 };

  useEffect(() => {
    
    fetchAllCountry();
    return () => {
     clearState();
    };
  }, []);

  useEffect(() => {
    console.log(checkoutOBJ);
  }, [checkoutOBJ]);
  useEffect(() => {
    console.log(dropDownData);
  }, [dropDownData]);

  useEffect(() => {
    console.log("inside country useeffect");
    if(dropDownData.selectedCountryCode!==""){
      const FetchStateListByCountryURL = `https://api.countrystatecity.in/v1/countries/${dropDownData.selectedCountryCode}/states`;
      axios
        .get(FetchStateListByCountryURL, {
          headers: {
            "X-CSCAPI-KEY": process.env.REACT_APP_ADDRESS_API_KEY,
          },
        })
        .then((res) => {
          setDropDownData({ ...dropDownData, states: res.data });
        })
        .catch((err) => {
          console.error(err, "Error form FetchAllState");
        });
    }

  }, [dropDownData.selectedCountryCode]);
  
  useEffect(() => {
    console.log("inside state useeffect");
    if(dropDownData.selectedCountryCode!=="" && dropDownData.selectedStateCode!==""){
      const FetchCityListByCountryAndStateURL = `https://api.countrystatecity.in/v1/countries/${dropDownData.selectedCountryCode}/states/${dropDownData.selectedStateCode}/cities`;
      axios
        .get(FetchCityListByCountryAndStateURL, {
          headers: {
            "X-CSCAPI-KEY": process.env.REACT_APP_ADDRESS_API_KEY,
          },
        })
        .then((res) => {
          setDropDownData({ ...dropDownData, cities: res.data });
        })
        .catch((err) => {
          console.error(err, "Error form FetchAllCity");
        });
    }
  }, [dropDownData.selectedStateCode]);

  const handlePincodeValidation = ()=>{

    if (dropDownData.selectedCountryCode !== "" && newAddress.pincode!=="" ) {
       const ValidatePinCodeURL = `https://api.worldpostallocations.com?postalcode=${newAddress.pincode}&countrycode=${dropDownData.selectedCountryCode}`;
       console.log(ValidatePinCodeURL);
       axios
         .get(ValidatePinCodeURL)
         .then((res) => {
           if (res.data.result.length > 0) {
             setMessage({...message,msg:"" ,error:false ,isvalidated:true});
           } else {
             setMessage({
               ...message,
               msg: "Enter Valid PinCode",
               error: true,
               isvalidated:false,
             });
           }
         })
         .catch((err) => {
           console.error(err, "Error form validate pin code");
         });
    }
  };
  
  const handleOnChange = (e)=>{

    const name = e.target.name;

    if(name === "country"){
      //In 0th index od array -> "codeAndCountryName", we have countryCode and at 1st index of Array we have countryName;
      const codeAndCountryName = e.target.value.split(",");

      if (codeAndCountryName[0] !== null && codeAndCountryName[0] !== undefined) {
        setnewAddress({ ...newAddress, country: codeAndCountryName[1] });
        setDropDownData({
          ...dropDownData,
          selectedCountryCode: codeAndCountryName[0],
        });
      }
    }
    else if( name === "state"){
      //In 0th index od array -> "codeAndStateName", we have countryCode and at 1st index of Array we have countryName;
      const codeAndStateName = e.target.value.split(",");

      if (
        codeAndStateName[0] !== null &&
        codeAndStateName[0] !== undefined &&
        dropDownData.selectedCountryCode !== ""
      ) {
        setnewAddress({ ...newAddress, state: codeAndStateName[1] });
        setDropDownData({
          ...dropDownData,
          selectedStateCode: codeAndStateName[0],
        });
      }
    }
    else if(name === "city"){
      const cityValue = e.target.value;

      if (cityValue !== "" && cityValue !== null && cityValue !== undefined) {
        setnewAddress({ ...newAddress, city: cityValue });
      }
    }
    else if (name === "pincode") {
      let postalCodeValue = e.target.value;
      if (
        postalCodeValue !== "" &&
        postalCodeValue !== null &&
        postalCodeValue !== undefined
      ) {
        setnewAddress({ ...newAddress, pincode: postalCodeValue });
        setMessage({ ...message, isvalidated: false });
      }
    } 
    else if (name === "address") {
      let address = e.target.value;
      CheckOutActions.setCheckOut({
        ...checkoutOBJ,
        amount: { ...checkoutOBJ.AmountOfOrder },
        address: address,
      });
    } 
    else {
      let value = e.target.value;
      const newdata = { ...newAddress };
      newdata[name] = value;
      setnewAddress(newdata);
      console.log(newdata);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newAddress, "from handle submit");

    if(userDetails.id!==""&& message.isvalidated ){

      axios
        .post(AddNewAddressURL, 
        {
          houseNo: newAddress.houseNo,
          street: newAddress.street,
          state: newAddress.state,
          city: newAddress.city,
          pincode : newAddress.pincode,
          landmark : newAddress.landmark,
          country : newAddress.country,
        },
        {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data !==null) {
            UserDetailActions.setUserDetail(res.data);
          }
          clearState();
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const renderOldAddress = userDetails.address.map((add, index) => {
    const {
      houseNo,
      street,
      state,
      city,
      pincode,
      landmark,
      country,
    } = add;

    const AddressString =  houseNo + ", "+ street+ ", "+ landmark+ ", "+ city + ", "+ state + ", "+ country+ ", "+ pincode; 

    return (
      <div className="p-3 my-3 border border-4 border-secondary rounded-3" key={index}>
        <div className="d-flex flex-row align-items-center">
          <div className="form-check">
            <input
              className="form-check-input me-3"
              type="radio"
              name="address"
              id="address"
              value={AddressString}
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="address">
              <h6 className="fw-bold mb-0">Address {index+1}</h6>
              <span className="card-text">
               {AddressString}
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {userDetails.address.length > 0 ? (
        <div>
          <h3 className="card-title">Select a delivery address</h3>
          {renderOldAddress}
        </div>
      ) : (
        <div className="mb-2">
          <h3 className="card-title">
            No Address Found! , Click Below To ADD New Addres
          </h3>
        </div>
      )}

      <div className="form-outline mb-4">
        <button
          className="btn btn-secondary me-2 mb-3"
          type="button"
          name="addNewAddress"
          data-bs-toggle="collapse"
          data-bs-target="#addNewAddress"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <BsFillPlusCircleFill size="1.5em" /> Add New Address
        </button>
        <div className="collapse" id="addNewAddress">
          <div className="card card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-md-4">
                  <label htmlFor="country" className="form-label">
                    Country/Region
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="form-select"
                    onChange={handleOnChange}
                    required
                  >
                    <option >
                      Choose...
                    </option>
                    {dropDownData.country.map((e) => (
                      <option key={e.id} value={e.iso2 + "," + e.name}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <select
                    id="inputState"
                    name="state"
                    className="form-select"
                    onChange={handleOnChange}
                    required
                  >
                    <option >
                      Choose...
                    </option>
                    {dropDownData.states.map((e) => (
                      <option key={e.id} value={e.iso2 + "," + e.name}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    className="form-select"
                    onChange={handleOnChange}
                    required
                  >
                    <option >
                      Choose...
                    </option>
                    {dropDownData.cities.map((e) => (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4">
                  <label htmlFor="House no." className="form-label">
                   House no., Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="House no."
                    name="houseNo"
                    value={newAddress.houseNo}
                    onChange={(event) => handleOnChange(event)}
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="street" className="form-label">
                    Area, Colony, Street, Sector, Village
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    value={newAddress.street}
                    onChange={(event) => handleOnChange(event)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="inputZip" className="form-label">
                      Pin code{" "}
                      {message.error ? (
                        <span>
                          (<i className="text-danger">**{message.msg}</i>)
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        id="inputZip"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={(event) => handleOnChange(event)}
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text text-muted">
                          {message.isvalidated ? (
                            <TiTick size={"1.5rem"} />
                          ) : (
                            <button
                              type="button"
                              className="btn p-0 m-0 "
                              onClick={handlePincodeValidation}
                            >
                              <GrValidate /> Validate
                            </button>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="landmark" className="form-label">
                    Landmark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="landmark"
                    name="landmark"
                    placeholder="1234 Main St"
                    value={newAddress.landmark}
                    onChange={(event) => handleOnChange(event)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !newAddress.country ||
                      !newAddress.state ||
                      !newAddress.city ||
                      !newAddress.houseNo ||
                      !newAddress.street ||
                      !newAddress.pincode ||
                      !message.isvalidated
                    }
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryAddress;
