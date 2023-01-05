import {
  IResellerHomeViralProducts,
  ResellerHomeActionEnum,
  ResellerHomeViralProductsActions,
} from "./Home.types";

// ViralProducts
export const resellerHomeViralProductsReducer = (
  state: IResellerHomeViralProducts[],
  action: ResellerHomeViralProductsActions
) => {
  switch (action.type) {
    case ResellerHomeActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
