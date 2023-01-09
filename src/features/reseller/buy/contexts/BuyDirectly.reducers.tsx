import {
  IBuyDirectlyItems,
  BuyDirectlyActionEnum,
  BuyDirectlyActions,
  IBuyDirectlyCalculator,
} from "./BuyDirectly.types";

// Items
export const buyDirectlyItemsReducer = (
  state: IBuyDirectlyItems,
  action: BuyDirectlyActions
) => {
  switch (action.type) {
    case BuyDirectlyActionEnum.SetItems:
      return action.payload;
    default:
      return state;
  }
};

// Calculator
export const buyDirectlyCalculatorReducer = (
  state: IBuyDirectlyCalculator,
  action: BuyDirectlyActions
) => {
  switch (action.type) {
    case BuyDirectlyActionEnum.SetCalculator:
      return action.payload;
    default:
      return state;
  }
};
