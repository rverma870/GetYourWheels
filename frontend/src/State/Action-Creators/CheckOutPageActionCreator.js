import { ActionTypes } from "../Contants/action-type";

export const increaseCheckOutPage = () => {
  return {
    type: ActionTypes.INCREASE_CHECKOUT_PAGE,
  };
};

export const decreaseCheckOutPage = () => {
  return {
    type: ActionTypes.DECREASE_CHECKOUT_PAGE,
  };
};

export const resetCheckOutPage = () => {
  return {
    type: ActionTypes.RESET_CHECKOUT_PAGE,
  };
};