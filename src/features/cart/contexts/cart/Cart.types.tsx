import { ICart } from "@/src/core/lib/models";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type InitialStateType = {
  cart: {
    is_empty: boolean;
    selected_items: number[];
    items: ICart[];
  };
};

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

type CartItemsPayload = {
  [CartActionsTypes.SetItems]: ICart[];
  [CartActionsTypes.SelectItem]: number;
  [CartActionsTypes.SelectAllItems]: undefined;
  [CartActionsTypes.ChangeNoteItem]: { id: number; note: string };
  [CartActionsTypes.ClearSelectedItem]: undefined;
  [CartActionsTypes.CheckItemIsEmpty]: ICart[];
};

export type CartItemsActions =
  ActionMap<CartItemsPayload>[keyof ActionMap<CartItemsPayload>];
