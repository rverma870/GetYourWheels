import { ActionTypes } from "../Contants/action-type";

const UserDetailInitialState = {
  id: "",
  name:"",
  email: "",
  mobile: "",
  address:[],
  role: [],
  cartId: "",
  orderId:"",
};


export const UserDetailReducer = (state = UserDetailInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        address:payload.address,
        role: payload.role,
        cartId: payload.cartId,
        orderId: payload.orderId,
      };
    default:
      return state;
  }
};

