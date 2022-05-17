import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { GrValidate } from "react-icons/gr";

const DealerRegistration = () => {

  const RegistrationUrl = `${process.env.REACT_APP_HOST_NAME}/Registration`;
  let navigate = useNavigate();

  const UserInitialState = {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    country: "",
    state: "",
    city: "",
    houseNo: "",
    street: "",
    pincode: "",
    landmark: "",
  };

  const [UserRegistration, setUserRegistration] = useState(UserInitialState);

  const clearState = () => {
   setUserRegistration({...UserInitialState});
  };


  const [message, setmessage] = useState({
    msg: "",
    submitted: false,
    error: false,
    isvalidated: false,
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const newdata = { ...UserRegistration };
    newdata[name] = value;
    setUserRegistration(newdata);
    if(name==="pincode"){
      setmessage({ ...message, isvalidated: false });
    }
  };

  useEffect(() => {
    console.log(UserRegistration);
  }, [UserRegistration]);

  const handlePincodeValidation = () => {
    if (UserRegistration.pincode !== "") {
      const ValidatePinCodeURL = `https://api.postalpincode.in/pincode/${UserRegistration.pincode}`;
      console.log(ValidatePinCodeURL);
      Axios.get(ValidatePinCodeURL)
        .then((res) => {
          console.log(res.data[0].PostOffice[0]);
          if (res.data[0].PostOffice.length > 0) {
            setmessage({
              ...message,
              msg: "",
              error: false,
              isvalidated: true,
            });
            const { Country, State, District } = res.data[0].PostOffice[0];
            setUserRegistration({
              ...UserRegistration,
              country: Country,
              state: State,
              city: District,
            });
          } else {
            setmessage({
              ...message,
              msg: "Enter Valid PinCode",
              error: true,
              isvalidated: false,
            });
          }
        })
        .catch((err) => {
          console.error(err, "Error form validate pin code");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(RegistrationUrl, {
      name: UserRegistration.firstname + UserRegistration.lastname,
      email: UserRegistration.email,
      password: UserRegistration.password,
      mobile: UserRegistration.phonenumber,
      address: [{
        houseNo: UserRegistration.houseNo,
        street: UserRegistration.street,
        state: UserRegistration.state,
        city: UserRegistration.city,
        pincode: UserRegistration.pincode,
        landmark: UserRegistration.landmark,
        country: UserRegistration.country,
      }],
    }).then((res) => {
      if (res.data === "User Registered Successfully") {
        setmessage({ submitted: true });
        console.log(message.submitted);
        successMessage();
         navigate("/DealerDetailsForm");
      } else {
        setmessage({ error: true });
        console.log(message.error);
        errorMessage();
      }
      clearState();
    });
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: message.submitted ? "" : "none",
        }}
      >
        User successfully Registered!
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: message.error ? "" : "none",
        }}
      >
        ***User already present!
      </div>
    );
  };

  return (
    <>
      <div className="container my-4">
        <div className="card  text-black">
          <div className="card-body p-4 p-md-4">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-outline">
                    <span id="Namespan"></span>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter Firstname"
                      value={UserRegistration.firstname}
                      onChange={handleInput}
                      className="form-control mb-1"
                    />
                    <label className="form-label" htmlFor="firstname">
                      FirstName
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-outline">
                    <span id="Namespan"></span>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter Lirstname"
                      value={UserRegistration.lastname}
                      onChange={handleInput}
                      className="form-control mb-1"
                    />
                    <label className="form-label" htmlFor="lastname">
                      LastName
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 pb-2">
                  <div className="form-outline">
                    <input
                      type="email"
                      id="emailAddress"
                      name="email"
                      placeholder="Enter Email"
                      value={UserRegistration.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 pb-2">
                  <div className="form-outline">
                    <input
                      type="number"
                      id="phonenumber"
                      name="phonenumber"
                      placeholder="Enter Number"
                      value={UserRegistration.phonenumber}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="phonenumber">
                      PhoneNumber
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 pb-2">
                  <div className="form-outline">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      placeholder="Minimum 8 characters"
                      value={UserRegistration.password}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="mb-2">Add Your Showroom Address :</h4>

              <div className="row mt-3 mb-2">
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
                        value={UserRegistration.pincode}
                        onChange={handleInput}
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text text-muted">
                          {message.isvalidated ? (
                            <TiTick size={"1.5rem"} />
                          ) : (
                            <button
                              type="button"
                              className="btn p-0 m-0"
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

                <div className="col-md-3">
                  <label htmlFor="country" className="form-label">
                    Country/Region
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-control"
                    value={UserRegistration.country}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    id="inputState"
                    name="state"
                    className="form-control"
                    value={UserRegistration.state}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={UserRegistration.city}
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-6">
                  <label htmlFor="House no." className="form-label">
                    House no., Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="House no."
                    name="houseNo"
                    value={UserRegistration.houseNo}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="street" className="form-label">
                    Area, Colony, Street, Sector, Village
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    value={UserRegistration.street}
                    onChange={handleInput}
                    required
                  />
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
                    value={UserRegistration.landmark}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4 pb-2">
                  <button
                    disabled={
                      !UserRegistration.firstname ||
                      !UserRegistration.lastname ||
                      !UserRegistration.email ||
                      !UserRegistration.password ||
                      !UserRegistration.pincode ||
                      !UserRegistration.houseNo ||
                      !UserRegistration.state ||
                      !UserRegistration.country ||
                      !UserRegistration.city ||
                      !UserRegistration.street ||
                      !message.isvalidated
                    }
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-6 mb-4 pb-2">
                  <h3 className="text-danger">
                    {message.msg}
                    {successMessage()}
                    {errorMessage()}
                  </h3>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerRegistration;
