import { ActionTypes } from "../Contants/action-type"

export const setProducts = (products)=>{
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    };
};

export const setPopularProducts = (products) => {
  return {
    type: ActionTypes.SET_POPULAR_PRODUCTS,
    payload: products,
  };
};

export const setCategoryOfProducts = (products) => {
  return {
    type: ActionTypes.SET_CATEGORY_OF_PRODUCTS,
    payload: products,
  };
};

export const setBrandOfProducts = (products) => {
  return {
    type: ActionTypes.SET_BRAND_OF_PRODUCTS,
    payload: products,
  };
};

export const removeSetProduct = () => {
  return {
    type: ActionTypes.REMOVE_SET_PRODUCT,
  };
};

export const removeBrandOfProducts = () => {
  return {
    type: ActionTypes.REMOVE_BRAND_OF_PRODUCTS,
  };
};



export const selectedProduct = (products) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: products,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT
  };
};