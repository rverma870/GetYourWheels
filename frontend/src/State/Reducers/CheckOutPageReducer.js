import { ActionTypes } from "../Contants/action-type";

const PageInitialState = 0;

export const CheckOutPageReducer = (state = PageInitialState, action) => {
  switch (action.type) {
    case ActionTypes.INCREASE_CHECKOUT_PAGE:
      return state + 1;
    case ActionTypes.DECREASE_CHECKOUT_PAGE:
      return state - 1;
    case ActionTypes.RESET_CHECKOUT_PAGE:
      return PageInitialState;
    default:
      return state;
  }
};
