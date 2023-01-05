import {
  IResellerOrderReviewViralProducts,
  ResellerOrderReviewActionEnum,
  ResellerOrderReviewViralProductsActions,
} from "./Review.types";

// ViralProducts
export const resellerOrderReviewViralProductsReducer = (
  state: IResellerOrderReviewViralProducts[],
  action: ResellerOrderReviewViralProductsActions
) => {
  switch (action.type) {
    case ResellerOrderReviewActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
