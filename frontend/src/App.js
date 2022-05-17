import { useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { UserDetailGlobal, ToggleActionCreators } from "./State/IndexActions";

import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Pages/Footer";
import AddProducts from "./Components/Dealer/AddProducts";
import LoginAndRegistration from "./Components/LogginAndRegistration/LoginAndRegistration";
import ListProductByBrand from "./Components/ListProductByBrand/ListProductByBrand";
import Cart from "./Components/Cart/Cart";
import Home from "./Pages/Home";
import ShowDealerProducts from "./Components/Dealer/ShowDealerProducts";
import MultistepCheckout from "./Components/Checkout/MultistepCheckout";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import FAQs from "./Pages/FAQs";
import PrivacyPolicies from "./Pages/PrivacyPolicies";
import TermAndConditions from "./Pages/TermAndConditions";
import DealerRegistration from "./Components/Dealer/DealerRegistration";
import DealerDetailsForm from "./Components/Dealer/DealerDetailsForm";

function App() {  

  const userDetails = useSelector((state) => state.UserDetail);

  const dispatch = useDispatch();
  const ToggleActions = bindActionCreators(ToggleActionCreators, dispatch);
  const UserDetailActions = bindActionCreators(UserDetailGlobal, dispatch);

  const authenticateUser = async()=>{
    
    const AuthenticationURL = `${process.env.REACT_APP_HOST_NAME}/authenticate/{validate}`

    await axios
      .get(AuthenticationURL, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data != null) {
          ToggleActions.ChangeLoginState();
          UserDetailActions.setUserDetail(res.data);
        }
        console.log(res.data, " form app.js");
      })
      .catch((err) => {
        console.error(err.message, " this is error form App.js");
      });
  }


  useEffect(() => {
    authenticateUser();
  }, [])

  useEffect(()=>{
    if(userDetails.name!==""){
      userDetails.role.map((e) => {
        if (e.roleName === "ROLE_DEALER") {
          ToggleActions.ChangeIsDealerBoolenState();
        }
      });
    }
  },[userDetails])

  return (
    <>
      <Router>
        <Navbar />
        <LoginAndRegistration />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/Dealer/Home" element={<ShowDealerProducts />} />
          <Route exact path="/Dealer/AddProducts" element={<AddProducts />} />
          <Route exact path="/Product/:productId" element={<ProductDetail />} />
          <Route
            exact
            path="/Brand/:brandName"
            element={<ListProductByBrand />}
          />
          <Route exact path="/User/Cart" element={<Cart />} />
          <Route
            exact
            path="/User/CheckoutAddress"
            element={<MultistepCheckout />}
          />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/FAQs" element={<FAQs />} />
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicies />} />
          <Route
            exact
            path="/TermAndConditions"
            element={<TermAndConditions />}
          />
          <Route
            exact
            path="/DealerRegistration"
            element={<DealerRegistration />}
          />
          <Route
            exact
            path="/DealerDetailsForm"
            element={<DealerDetailsForm />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

