import {
  IResellerOrderFindViralProducts,
  ResellerOrderFindActionEnum,
  ResellerOrderFindViralProductsActions,
} from "./Find.types";

// ViralProducts
export const resellerOrderFindViralProductsReducer = (
  state: IResellerOrderFindViralProducts[],
  action: ResellerOrderFindViralProductsActions
) => {
  switch (action.type) {
    case ResellerOrderFindActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
