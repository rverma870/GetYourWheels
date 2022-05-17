import { ActionTypes } from "../Contants/action-type";

const CheckOutInitialState = {
  userId: "",
  productsIds: [],
  deliveryAddress: "",
  AmountOfOrder: {
    subTotal: "",
    gst: "",
    totalAmount: "",
  },
  modeOfPayment: "",
  serverOrderId:"",
  razOrderId: "",
  razPaymentId: "",
  razSignature: "",
  transactionStatus: "",
  paymentStatus: "",
};

export const CheckOutReducer = (state = CheckOutInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CHECKOUT_OBJ:
      return {
        ...state,
        userId: payload.userId,
        productsIds: payload.productsIds,
        deliveryAddress: payload.address,
        AmountOfOrder: payload.amount,
        modeOfPayment: payload.modeOfPayment,
        serverOrderId: payload.serverOrderId,
        razOrderId: payload.razOrderId,
        razPaymentId: payload.razPaymentId,
        razSignature: payload.razSignature,
        transactionStatus: payload.transactionStatus,
        paymentStatus: payload.paymentStatus,
      };
    case ActionTypes.REMOVE_CHECKOUT_OBJ:
      return CheckOutInitialState;
    default:
      return state;
  }
};