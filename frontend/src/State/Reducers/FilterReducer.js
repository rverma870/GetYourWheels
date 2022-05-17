import { ActionTypes } from "../Contants/action-type";

const FilterInitialState = {
  startingPrice: -1,
  finalPrice: -1,
  bodyType: "none",
  sortBy: "none",
};

export const FilterReducer = (state = FilterInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        startingPrice: payload.startingPrice,
        finalPrice: payload.finalPrice,
        bodyType: payload.bodyType,
        sortBy: payload.sortBy,
      };
    case ActionTypes.REMOVE_FILTER:
      return FilterInitialState;
    default:
      return state;
  }
};
