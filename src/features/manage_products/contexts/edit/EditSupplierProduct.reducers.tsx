import {
  IEditSupplierProductViralProducts,
  EditSupplierProductActionEnum,
  EditSupplierProductViralProductsActions,
} from "./EditSupplierProduct.types";

// ViralProducts
export const editSupplierProductViralProductsReducer = (
  state: IEditSupplierProductViralProducts[],
  action: EditSupplierProductViralProductsActions
) => {
  switch (action.type) {
    case EditSupplierProductActionEnum.SetViralProducts:
      return action.payload;
    default:
      return state;
  }
};
