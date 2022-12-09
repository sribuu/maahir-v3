import {
  IAddSupplierProductViralProducts,
  AddSupplierProductActionEnum,
  AddSupplierProductViralProductsActions,
} from "./AddSupplierProduct.types";

// ViralProducts
export const addSupplierProductViralProductsReducer = (
  state: IAddSupplierProductViralProducts[],
  action: AddSupplierProductViralProductsActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
