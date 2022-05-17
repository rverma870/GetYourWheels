import { ActionTypes } from "../Contants/action-type";

export const setCart = (cartDetail) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cartDetail,
  };
};

export const removeSetCart = () => {
  return {
    type: ActionTypes.REMOVE_CART,
  };
};