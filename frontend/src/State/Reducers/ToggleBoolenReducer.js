import { ActionTypes } from "../Contants/action-type";

export const IsLoginReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOGIN_STATE:
      return !state;
    default:
      return state;
  }
};

export const UpdateBoolenReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_UPDATEBOOLEN:
      return !state;
    default:
      return state;
  }
};

export const IsDealerBoolenReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_DEALER_BOOLEN:
      return !state;
    default:
      return state;
  }
};
