import {
  ISupplierHomeBalance,
  ISupplierHomeOrder,
  SupplierHomeActionEnum,
  SupplierHomeActions,
} from "./HomeSupplier.types";

// Balance
export const supplierHomeBalanceReducer = (
  state: ISupplierHomeBalance[],
  action: SupplierHomeActions
) => {
  switch (action.type) {
    case SupplierHomeActionEnum.SetBalance:
      return action.payload;
    default:
      return state;
  }
};

// Order
export const supplierHomeOrderReducer = (
  state: ISupplierHomeOrder[],
  action: SupplierHomeActions
) => {
  switch (action.type) {
    case SupplierHomeActionEnum.SetOrder:
      return action.payload;
    default:
      return state;
  }
};
