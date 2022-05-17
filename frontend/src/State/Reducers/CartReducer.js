import { ActionTypes } from "../Contants/action-type";

const CartInitialState = {
  products: [],
  subTotal:"",
  gstAmount:"",
  totalAmount:""
};


export const CartReducer = (state = CartInitialState,{ type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return {
        ...state,
        products: payload.products,
        subTotal: payload.subTotal,
        gstAmount: payload.gstAmount,
        totalAmount: payload.totalAmount,
      };
    case ActionTypes.REMOVE_CART:
      return CartInitialState;
    default:
      return state;
  }
};