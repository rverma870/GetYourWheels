import { ActionTypes } from "../Contants/action-type";

export const setUserDetail = (userDetail) => {
  return {
    type: ActionTypes.SET_USER_DETAILS,
    payload: userDetail,
  };
};