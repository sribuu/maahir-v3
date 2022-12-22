import {
  IResellerCartItems,
  ResellerCartItemsActionEnum,
  ResellerCartActions,
} from "./Cart.types";

// Is Empty
export const resellerCartIsEmptyReducer = (
  state: boolean,
  action: ResellerCartActions
) => {
  switch (action.type) {
    case ResellerCartItemsActionEnum.SetIsEmpty:
      return action.payload;
    default:
      return state;
  }
};

// Total Number
export const resellerCartTotalNumberReducer = (
  state: number,
  action: ResellerCartActions
) => {
  switch (action.type) {
    case ResellerCartItemsActionEnum.SetTotalNumber:
      return action.payload;
    default:
      return state;
  }
};

// Items
export const resellerCartItemsReducer = (
  state: IResellerCartItems[],
  action: ResellerCartActions
) => {
  switch (action.type) {
    case ResellerCartItemsActionEnum.SetItems:
      return action.payload;
    default:
      return state;
  }
};
