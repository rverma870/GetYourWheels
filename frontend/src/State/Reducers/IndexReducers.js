import { combineReducers } from "redux";
import {IsLoginReducer,UpdateBoolenReducer,IsDealerBoolenReducer }from "./ToggleBoolenReducer";
import { productReducer,selectedProductReducer,popularProductReducer,categoryProductReducer,brandProductReducer } from "./ProductReducer";
import { UserDetailReducer } from "./UserDetailReducer";
import { CartReducer } from "./CartReducer";
import { CheckOutReducer } from "./CheckOutReducer";
import { CheckOutPageReducer } from "./CheckOutPageReducer";
import { FilterReducer } from "./FilterReducer";

const reducers = combineReducers({
    IsLoggedIn : IsLoginReducer,
    UserDetail: UserDetailReducer,
    UpdateBoolen: UpdateBoolenReducer,
    IsDealerBoolen: IsDealerBoolenReducer,
    AllProducts: productReducer,
    PopularProducts:popularProductReducer,
    CategoryOfProducts:categoryProductReducer,
    BrandsOfProducts:brandProductReducer,
    product: selectedProductReducer,
    Cart: CartReducer,
    CheckOutOBJ:CheckOutReducer,
    PageStatus: CheckOutPageReducer,
    Filter: FilterReducer
});

export default reducers;