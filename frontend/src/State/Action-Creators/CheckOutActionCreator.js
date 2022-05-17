import { ActionTypes } from "../Contants/action-type";

export const setCheckOut = (checkoutObj) => {
  return {
    type: ActionTypes.SET_CHECKOUT_OBJ,
    payload: checkoutObj,
  };
};

export const removeCheckOut = () => {
  return {
    type: ActionTypes.REMOVE_CHECKOUT_OBJ,
  };
};