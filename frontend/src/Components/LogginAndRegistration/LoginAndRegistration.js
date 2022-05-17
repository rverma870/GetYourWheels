import React, { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faKey,faEnvelope,faMobile,} from "@fortawesome/free-solid-svg-icons";
import { faGooglePlus, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { UserDetailGlobal, ToggleActionCreators } from "../../State/IndexActions";

const LoginAndRegistration = () => {

  const dispatch = useDispatch();
  const actions = bindActionCreators(ToggleActionCreators, dispatch);
  const UserDetailActions = bindActionCreators(UserDetailGlobal, dispatch); 

  const RegistrationUrl = `${process.env.REACT_APP_HOST_NAME}/Registration`;
  const LoginUrl = `${process.env.REACT_APP_HOST_NAME}/Login`;

  //This state show Login form by default for the state true and if state is
  //false it shows Registration/signup form.
  const [ToggleModalContent, setToggleModalContent] = useState(true);

  //User Initial state for the form data.
  const UserDetailsInitialState = {
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  };

  const [UserDetailsEntered, setUserDetailsEntered] = useState(()=>
    UserDetailsInitialState
  );

  const clearState = () => {
    setUserDetailsEntered({ ...UserDetailsInitialState });
  };

  const [message, setmessage] = useState({
    msg:"",
    error: false,
    termConditioncheck: false,
    rememberMeCheck: false,
    isLoggedin: false
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "termConditioncheck") {
      if (e.target.checked) {
        setmessage({ ...message, termConditioncheck: true });
      } else {
        setmessage({ ...message, termConditioncheck: false });
      }
      console.log(message);
    } else if (name === "rememberMeCheck") {
      if (e.target.checked) {
        setmessage({ ...message, rememberMeCheck: true });
      } else {
        setmessage({ ...message, rememberMeCheck: false });
      }
    } else {
      const newdata = { ...UserDetailsEntered };
      newdata[name] = value;
      console.log(newdata);
      setUserDetailsEntered(newdata);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ToggleModalContent && message.termConditioncheck) {
      Axios.post(RegistrationUrl, {
        name: UserDetailsEntered.firstname,
        email: UserDetailsEntered.email,
        password: UserDetailsEntered.password,
        mobile: UserDetailsEntered.phonenumber,
      })
        .then((res) => {
          console.log(res.data);

          if (res.data === "User Registered Successfully") {
            setmessage({
              ...message,
              termConditioncheck: false,
              isLoggedin: false,
              error: false,
            });

            clearState();
            setToggleModalContent(true);
          }
        })
        .catch((err) => {
          console.error(err.message);
          if (err.message === "Request failed with status code 303") {
            setmessage({ ...message, error: true });
          }
        });
    } else if (ToggleModalContent) {
     await Axios.post(
        LoginUrl,
        {
          email: UserDetailsEntered.email,
          password: UserDetailsEntered.password,
        },
        {
          withCredentials: true,
        }
      )
        .then((res) => {
          // let cookieValue = document.cookie.replace(
          //   /(?:(?:^|.*;\s*)JWT_token\s*\=\s*([^;]*).*$)|^.*$/,
          //   "$1"
          // );
          // console.log(cookieValue, " this is cookie value");
          // console.log(document.cookie, "this is cookie");
          if (res.data !==null) {
            setmessage({
              ...message,
              error: false,
              isLoggedin:true,
              rememberMeCheck: false,
            });
            actions.ChangeLoginState();
            UserDetailActions.setUserDetail(res.data);

            document.getElementById("modalCloseButton").click();
            clearState();
            // navigate("/");
          }
        })
        .catch((err) => {
          console.error(err.message, "this is error from login submitt");
          if (err.message === "Network Error") {
            setmessage({ ...message, error: true ,msg:"Server Error! try again after sometime"});
          }
          else if(err.message === "Request failed with status code 401"){
            setmessage({
              ...message,
              error: true,
              msg: "Invalid Credentials"
            });
          }
        });
    }
  };

  const LoginForm = (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text my-2">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control my-2"
                  placeholder="Email"
                  name="email"
                  value={UserDetailsEntered.email}
                  onChange={handleInput}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text my-2">
                    <FontAwesomeIcon icon={faKey} size="2x" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control my-2"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={UserDetailsEntered.password}
                  onChange={handleInput}
                  placeholder="Password "
                />
              </div>
              <div className="remember my-1">
                <input
                  type="checkbox"
                  className="m-1"
                  name="rememberMeCheck"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                Remember Me
              </div>
              <div className="form-group ">
                <button
                  type="submit"
                  id="LoginButton"
                  className="btn btn-success float-right my-2"
                  disabled={
                    !UserDetailsEntered.email || !UserDetailsEntered.password
                  }
                >
                  Login
                </button>
              </div>
              <div>
                <i className="text-danger">
                  {message.error ? message.msg : ""}
                </i>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <div className="">
              <span>Or Sign-In With</span>{" "}
              <button type="button" className="btn btn-floating mx-1">
                <FontAwesomeIcon icon={faGooglePlus} size="2x" />
              </button>
              <button type="button" className="btn btn-floating mx-1">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const SignUpForm = (
    <>
      <div className="ms-3 my-2">
        Create Your Account. Its free and only takes a minute.
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text my-2">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control my-2"
                  name="name"
                  placeholder="Enter Your Name"
                  value={UserDetailsEntered.name}
                  onChange={handleInput}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-addon">
                  <span className="input-group-text my-2">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control my-2"
                  name="email"
                  placeholder="Enter Email Address"
                  value={UserDetailsEntered.email}
                  onChange={handleInput}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text my-2">
                    <FontAwesomeIcon icon={faKey} size="2x" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control my-2"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  placeholder="Password"
                  value={UserDetailsEntered.password}
                  onChange={handleInput}
                />
              </div>

              <div className="input-group form-group">
                <div className="input-group-addon">
                  <span className="input-group-text my-2 px-3">
                    <FontAwesomeIcon icon={faMobile} size="2x" />
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control my-2"
                  name="phonenumber"
                  placeholder="Enter Mobile No."
                  value={UserDetailsEntered.phonenumber}
                  onChange={handleInput}
                />
              </div>

              <div className=" my-1">
                <input
                  type="checkbox"
                  className="m-2"
                  name="termConditioncheck"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                I accept the
                <Link to="#">Terms of Use</Link> &
                <Link to="#">Privacy Policy</Link>.
              </div>
              <div className="form-group ">
                <button
                  type="submit"
                  className="btn btn-success float-right my-2"
                  disabled={
                    !UserDetailsEntered.name ||
                    !UserDetailsEntered.email ||
                    !UserDetailsEntered.password ||
                    !UserDetailsEntered.phonenumber ||
                    !message.termConditioncheck
                  }
                >
                  Sign Up
                </button>
              </div>
              <div>
                <i className="text-danger">
                  {message.error ? "***User already present!" : ""}
                </i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        id="LoginModal"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {ToggleModalContent ? (
                <h3 className="modal-title ms-auto">Login</h3>
              ) : (
                <h3 className="modal-title ms-auto">Sign Up</h3>
              )}

              <button
                type="button"
                className="btn-close"
                id="modalCloseButton"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setToggleModalContent(true);
                  clearState();
                }}
              ></button>
            </div>
            <div className="modal-body">
              {ToggleModalContent ? LoginForm : SignUpForm}
            </div>
            <div className="modal-footer">
              {ToggleModalContent ? (
                <>
                  <div className="mx-auto">
                    <span className="me-1">Don't have an account?</span>
                    <Link
                      to="#"
                      className="link-danger text-decoration-none"
                      onClick={() => {
                        setToggleModalContent(false);
                      }}
                    >
                      Register
                    </Link>
                  </div>
                  <div className="me-5">
                    <Link to="#" className="link-primary text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>
                </>
              ) : (
                <div className="mx-auto">
                  <span className="me-1">Already have an account?</span>
                  <Link
                    to="#"
                    className="link-success text-decoration-none"
                    onClick={() => {
                      setToggleModalContent(true);
                    }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAndRegistration;
