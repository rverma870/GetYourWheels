import { ActionTypes } from "../Contants/action-type";

const initialState = {
    products:[],
    popularProducts:[],
    categoryOfProducts:[],
    brandsOfProducts:[]
}

export const productReducer = (state=initialState, action)=>{
    switch (action.type) {
      case ActionTypes.SET_PRODUCTS:
        return { ...state, products: action.payload };   
      case ActionTypes.REMOVE_SET_PRODUCT:
        return initialState;
      default:
        return state;
    }
};

export const popularProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_POPULAR_PRODUCTS:
      return { ...state, popularProducts: action.payload };
    case ActionTypes.REMOVE_SET_PRODUCT:
      return { ...state, popularProducts: [] };
    default:
      return state;
  }
};

export const categoryProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORY_OF_PRODUCTS:
      return { ...state, categoryOfProducts: action.payload };
    case ActionTypes.REMOVE_SET_PRODUCT:
      return { ...state, categoryOfProducts: [] };
    default:
      return state;
  }
};

export const brandProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BRAND_OF_PRODUCTS:
      return { ...state, brandsOfProducts: action.payload };
    case ActionTypes.REMOVE_BRAND_OF_PRODUCTS:
      return { ...state, brandsOfProducts: [] };
    default:
      return state;
  }
};

const initialStateOfProductDetails = {
  id:"",
  productName: "",
  company: "",
  category: "",
  variants: [],
  startingPrice: "",
  finalPrice: "",
  image: [],
  discription: "",
  bhp: "",
  noOfSeats: "",
  safetyRating: "",
};

export const selectedProductReducer = (state = initialStateOfProductDetails, action) => {
  switch (action.type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...action.payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return initialStateOfProductDetails;

    default:
      return state;
  }
};