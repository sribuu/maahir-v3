import {
  ISupplierProfileViralProducts,
  SupplierProfileActionEnum,
  SupplierProfileViralProductsActions,
} from "./Profile.types";

// ViralProducts
export const supplierProfileViralProductsReducer = (
  state: ISupplierProfileViralProducts[],
  action: SupplierProfileViralProductsActions
) => {
  switch (action.type) {
    case SupplierProfileActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
