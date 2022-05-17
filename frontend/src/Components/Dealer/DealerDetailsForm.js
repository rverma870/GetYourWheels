import React, { useState, useEffect } from "react";
import Axios from "axios";

function DealerDetailsForm() {

    const initialDetails = {
        dealerName:"",
        email:"",
        company:"",
        gst_no:""
    };

    const [dealerDetails, setDealerDetails] = useState(initialDetails);

    const [message, setMessage] = useState({
        msg: "",
        isSubmitted: false,
        error: false,
    });


    const clearState = () => {
        setDealerDetails({...initialDetails});
    };


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const newdata = { ...dealerDetails };
        newdata[name] = value;
        setDealerDetails(newdata);
    };

    const DealerRegistration = `${process.env.REACT_APP_HOST_NAME}/Registration/dealer/add`;
    const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(DealerRegistration, {
      dealerName: dealerDetails.dealerName,
      dealerCompany: dealerDetails.company,
      email: dealerDetails.email,
      gst_NO: dealerDetails.gst_no,
    })
      .then((res) => {
        if (res.data === "Dealer added Successfully") {
          setMessage({
            ...message,
            isSubmitted: true,
            error: false,
            msg: "Registration Successfully, Plz Login!",
          });
          clearState();
        }
        console.log(res.data);
      })
      .catch((err) => {
        setMessage({
          ...message,
          error: true,
          isSubmitted: false,
          msg: "Registraion Failed, Try Again!!",
        });
      });
    };
 
    useEffect(() => {
      console.log(dealerDetails);
    
    }, [dealerDetails])
    
  return (
    <div>
      <div className="container my-4">
        <div className="card  text-black">
          <div className="card-body p-4 p-md-4">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Few More Steps To GO</h3>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-outline">
                    <span id="Namespan"></span>
                    <input
                      type="text"
                      name="dealerName"
                      placeholder="Enter Full Name"
                      value={dealerDetails.dealerName}
                      onChange={handleInput}
                      className="form-control mb-1"
                    />
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                  </div>
                </div>
                <div className="col-md-6 pb-2">
                  <div className="form-outline">
                    <input
                      type="email"
                      id="emailAddress"
                      name="email"
                      placeholder="Enter Email"
                      value={dealerDetails.email}
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
                <div className="col-md-6 pb-2">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="gst_no"
                      name="gst_no"
                      placeholder="Enter Your GST Number"
                      value={dealerDetails.gst_no}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="gst_no">
                      GST Number
                    </label>
                  </div>
                </div>

                <div className="col-md-6 pb-2">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Enter Company Name You Want To Sell"
                      value={dealerDetails.company}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="company">
                      Dealing Company Name
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4 pb-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={
                      !dealerDetails.dealerName ||
                      !dealerDetails.email ||
                      !dealerDetails.gst_no ||
                      !dealerDetails.company
                    }
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-6 mb-4 pb-2">
                    {message.isSubmitted?(<div className="text-danger">{message.msg}</div>):""}
                    {message.error?(<div className="text-danger">{message.msg}</div>):""}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerDetailsForm;
