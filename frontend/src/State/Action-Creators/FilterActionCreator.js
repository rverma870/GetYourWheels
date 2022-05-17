import { ActionTypes } from "../Contants/action-type";

export const setFilter = (filter) => {
  return {
    type: ActionTypes.SET_FILTER,
    payload: filter,
  };
};

export const removeFilter = () => {
  return {
    type: ActionTypes.REMOVE_FILTER,
  };
};
