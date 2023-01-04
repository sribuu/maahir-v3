import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
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
    items: IResellerCart[];
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
    case ResellerMyCartActionsEnum.SelectAll:
      const selectAllCondition = !state.select_all;
      return {
        ...state,
        select_all: selectAllCondition,
        items: state.items.map((item) => {
          return {
            ...item,
            supplier: {
              ...item.supplier,
              selected: selectAllCondition,
              data: item.supplier.data.map((itemData) => {
                return {
                  ...itemData,
                  selected: selectAllCondition,
                };
              }),
            },
          };
        }),
      };
    case ResellerMyCartActionsEnum.SelectSupplier:
      return {
        ...state,
        select_all:
          state.items.reduce((acc, item) => {
            return (
              acc +
              (item.supplier.selected && action.payload !== item.supplier.id
                ? 1
                : !item.supplier.selected && action.payload === item.supplier.id
                ? 1
                : 0)
            );
          }, 0) === state.items.length,
        items: state.items.map((item) => {
          const result =
            item.supplier.id === action.payload
              ? !item.supplier.selected
              : item.supplier.selected;

          return {
            ...item,
            supplier: {
              ...item.supplier,
              selected: result,
              data: item.supplier.data.map((itemData) => {
                return {
                  ...itemData,
                  selected: result,
                };
              }),
            },
          };
        }),
      };
    case ResellerMyCartActionsEnum.SelectItem:
      return {
        ...state,
        select_all:
          state.items.reduce((acc, item) => {
            const supplierItemTotal = item.supplier.data.reduce(
              (accData, itemData) => {
                return (
                  accData +
                  (itemData.selected && action.payload !== itemData.variant_id
                    ? 1
                    : !itemData.selected &&
                      action.payload === itemData.variant_id
                    ? 1
                    : 0)
                );
              },
              0
            );
            return acc + supplierItemTotal;
          }, 0) ===
          state.items.reduce((acc, item) => {
            const supplierItemTotal = item?.supplier?.data.reduce(
              (accSupplierItem, supplierItem) => {
                accSupplierItem = supplierItem.quantity + accSupplierItem;
                return accSupplierItem;
              },
              0
            );
            return acc + supplierItemTotal;
          }, 0),
        items: state.items.map((item) => {
          return {
            ...item,
            supplier: {
              ...item.supplier,
              selected:
                item.supplier.data.reduce((acc, itemData) => {
                  return (
                    acc +
                    (itemData.selected && action.payload !== itemData.variant_id
                      ? 1
                      : !itemData.selected &&
                        action.payload === itemData.variant_id
                      ? 1
                      : 0)
                  );
                }, 0) === item.supplier.data.length,
              data: item.supplier.data.map((itemData) => {
                return {
                  ...itemData,
                  selected:
                    itemData.variant_id === action.payload
                      ? !itemData.selected
                      : itemData.selected,
                };
              }),
            },
          };
        }),
      };

    // case ResellerMyCartActionsEnum.SelectAllItems:
    //   return {
    //     ...state,
    //     selected_items:
    //       state.selected_items.length !== state.items.length
    //         ? state.items.map((item) => item.id)
    //         : [],
    //   };
    // case ResellerMyCartActionsEnum.ChangeNoteItem:
    //   return {
    //     ...state,
    //     items: state.items.map((item) => {
    //       return {
    //         ...item,
    //         note:
    //           item.id === action.payload.id ? action.payload.note : item.note,
    //       };
    //     }),
    //   };
    // case ResellerMyCartActionsEnum.ClearSelectedItem:
    //   return {
    //     ...state,
    //     selected_items: [],
    //   };

    default:
      return state;
  }
};
