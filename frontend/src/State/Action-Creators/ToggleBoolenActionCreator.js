import { ActionTypes } from "../Contants/action-type";

export const ChangeLoginState = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_LOGIN_STATE,
      payload: true,
    });
  };
};

export const ChangeUpdateBoolenState = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_UPDATEBOOLEN,
      payload: true,
    });
  };
};

export const ChangeIsDealerBoolenState = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_DEALER_BOOLEN,
      payload: true,
    });
  };
};
