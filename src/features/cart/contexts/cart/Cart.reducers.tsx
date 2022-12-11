import { ICart } from "@/src/core/lib/models";
import { CartItemsActions } from "./Cart.types";

export type CartActions = CartItemsActions;

export enum CartActionsTypes {
  // items
  SetItems = "SetItems",
  ChangeNoteItem = "ChangeNoteItem",
  SelectItem = "SelectItem",
  SelectAllItems = "SelectAllItems",
  ClearSelectedItem = "ClearSelectedItems",
  CheckItemIsEmpty = "CheckIsEmpty",
}

// Items

export const itemsReducer = (
  state: { is_empty: boolean; selected_items: number[]; items: ICart[] },
  action: CartActions
) => {
  switch (action.type) {
    case CartActionsTypes.SetItems:
      return {
        ...state,
        items: action.payload,
      };
    case CartActionsTypes.SelectItem:
      return {
        ...state,
        selected_items: state.selected_items.includes(action.payload)
          ? state.selected_items.filter((item) => item !== action.payload)
          : [...state.selected_items, action.payload],
      };
    case CartActionsTypes.SelectAllItems:
      return {
        ...state,
        selected_items:
          state.selected_items.length !== state.items.length
            ? state.items.map((item) => item.id)
            : [],
      };
    case CartActionsTypes.ChangeNoteItem:
      return {
        ...state,
        items: state.items.map((item) => {
          return {
            ...item,
            note:
              item.id === action.payload.id ? action.payload.note : item.note,
          };
        }),
      };
    case CartActionsTypes.ClearSelectedItem:
      return {
        ...state,
        selected_items: [],
      };
    case CartActionsTypes.CheckItemIsEmpty:
      return {
        ...state,
        is_empty: !action.payload.length,
      };
    default:
      return state;
  }
};
