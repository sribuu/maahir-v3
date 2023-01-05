import {
  IResellerOrderFinishPaymentViralProducts,
  ResellerOrderFinishPaymentActionEnum,
  ResellerOrderFinishPaymentViralProductsActions,
} from "./FinishPayment.types";

// ViralProducts
export const resellerOrderFinishPaymentViralProductsReducer = (
  state: IResellerOrderFinishPaymentViralProducts[],
  action: ResellerOrderFinishPaymentViralProductsActions
) => {
  switch (action.type) {
    case ResellerOrderFinishPaymentActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
