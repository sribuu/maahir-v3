import {
  ResellerMyCartActions,
  ResellerMyCartActionsEnum,
} from "./MyCart.types";

// Total Number
export const resellerMyCartTotalNumberReducer = (
  state: number,
  action: ResellerMyCartActions
) => {
  switch (action.type) {
    case ResellerMyCartActionsEnum.SetTotalNumber:
      return action.payload;
    default:
      return state;
  }
};

// Items
export const resellerMyCartItemsReducer = (
  state: {
    is_empty: boolean;
    select_all: boolean;
    // items: IResellerCart[];
    items: {
      variant_id: string;
      selected: boolean;
      image: string;
      category_name: string;
      product_name: string;
      variant_name: string;
      price: number;
      formatted_price: string;
      note: string;
      quantity: number;
    }[];
    // unavailable items
    is_any_unavailable_items: boolean;
    show_unavailable_items: boolean;
    unavailable_items: {
      variant_id: string;
      category_name: string;
      product_name: string;
      variant_name: string;
      price: number;
      formatted_price: string;
      image: string;
    }[];
  },
  action: ResellerMyCartActions
) => {
  switch (action.type) {
    case ResellerMyCartActionsEnum.CheckItemIsEmpty:
      return {
        ...state,
        is_empty: action.payload,
      };
    case ResellerMyCartActionsEnum.SetItems:
      return {
        ...state,
        items: action.payload,
      };
    // new
    case ResellerMyCartActionsEnum.SelectAll:
      return {
        ...state,
        select_all: !state.select_all,
        items: state.items.map((item) => {
          return {
            ...item,
            selected: !state.select_all,
          };
        }),
      };
    case ResellerMyCartActionsEnum.SelectItem:
      return {
        ...state,
        select_all:
          state.items.reduce((acc, item) => {
            const counter =
              item.selected && String(action.payload) !== item.variant_id
                ? 1
                : !item.selected && String(action.payload) === item.variant_id
                ? 1
                : 0;
            return acc + counter;
          }, 0) === state.items.length,
        items: state.items.map((item) => {
          return {
            ...item,
            selected:
              item.variant_id === String(action.payload)
                ? !item.selected
                : item.selected,
          };
        }),
      };

    case ResellerMyCartActionsEnum.SetUnavailableItems:
      return {
        ...state,
        unavailable_items: action.payload,
      };
    case ResellerMyCartActionsEnum.SetIsAnyUnavailableItems:
      return {
        ...state,
        is_any_unavailable_items: action.payload,
      };
    case ResellerMyCartActionsEnum.ShowUnavailableItems:
      return {
        ...state,
        show_unavailable_items: true,
      };
    default:
      return state;
  }
};
