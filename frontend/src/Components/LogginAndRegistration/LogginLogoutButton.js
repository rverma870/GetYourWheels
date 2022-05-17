import React from 'react';
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ToggleActionCreators } from "../../State/IndexActions";
import axios from "axios";

function LogginLogoutButton(props) {

  const isLoggedIn = useSelector((state) => state.IsLoggedIn);
  const dispatch = useDispatch();
  const actions = bindActionCreators(ToggleActionCreators, dispatch);

  const LogOutUrl = `${process.env.REACT_APP_HOST_NAME}/Logout`;


  const handleLogout = async()=>{
    
    await axios
      .get(LogOutUrl, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === "User successfully Logged Out") {
          actions.ChangeLoginState();
          actions.ChangeIsDealerBoolenState();
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message, " this is error form logginLogoutButton");
      });
  }

    return (
      <>
        <button
          className="NavbarLogginRegistrationButton btn btn me-2"
          type="button"
          data-bs-toggle={isLoggedIn?"":"modal"}
          data-bs-target="#LoginModal"
          onClick={isLoggedIn?handleLogout:null}
        >
          <FaUser size={"4vh"}/>
          <div>{isLoggedIn?"LogOut":"Login/SignUp"}</div>
        </button>
      </>
    );
}

export default LogginLogoutButton;
