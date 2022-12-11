import {
  IResellerOrderDetailInformationViralProducts,
  ResellerOrderDetailInformationActionEnum,
  ResellerOrderDetailInformationViralProductsActions,
} from "./FillDetail.types";

// ViralProducts
export const resellerOrderDetailInformationViralProductsReducer = (
  state: IResellerOrderDetailInformationViralProducts[],
  action: ResellerOrderDetailInformationViralProductsActions
) => {
  switch (action.type) {
    case ResellerOrderDetailInformationActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
