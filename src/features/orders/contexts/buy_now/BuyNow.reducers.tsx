import { thousandSeparator } from "@/src/core/utils/formatters";
import {
  IResellerOrderBuyNowItem,
  IResellerOrderBuyNowSummary,
  ResellerOrderBuyNowActionEnum,
  ResellerOrderBuyNowActions,
} from "./BuyNow.types";

//  Price
export const resellerOrderBuyNowPriceReducer = (
  state: number,
  action: ResellerOrderBuyNowActions
) => {
  switch (action.type) {
    case ResellerOrderBuyNowActionEnum.SetPrice:
      return action.payload;

    default:
      return state;
  }
};

// Item
export const resellerOrderBuyNowItemReducer = (
  state: IResellerOrderBuyNowItem[],
  action: ResellerOrderBuyNowActions
) => {
  switch (action.type) {
    case ResellerOrderBuyNowActionEnum.SetItem:
      return action.payload;
    // case ResellerOrderBuyNowActionEnum.SetItemQuantity:
    //   return { ...state, quantity: action.payload };
    // case ResellerOrderBuyNowActionEnum.SetItemNotes:
    //   return { ...state, notes: action.payload };
    default:
      return state;
  }
};

// Price
export const resellerOrderBuyNowSummaryReducer = (
  state: IResellerOrderBuyNowSummary,
  action: ResellerOrderBuyNowActions
) => {
  switch (action.type) {
    case ResellerOrderBuyNowActionEnum.SetSummary:
      return action.payload;
    case ResellerOrderBuyNowActionEnum.SetSummaryQuantity:
      return {
        ...state,
        quantity: action.payload.quantity,
        sub_total_price: thousandSeparator(
          action.payload.quantity * action.payload.price
        ),
        total_price: thousandSeparator(
          action.payload.quantity * action.payload.price
        ),
      };
    default:
      return state;
  }
};
