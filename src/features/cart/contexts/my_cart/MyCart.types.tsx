// import { ICart } from "@/src/core/lib/models";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";

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
  total_number: number;
  cart: {
    is_empty: boolean;
    select_all: boolean;
    items: IResellerCart[];
  };
};

export type ResellerMyCartActions =
  | ResellerMyCartTotalNumberActions
  | ResellerMyCartItemsActions;

export enum ResellerMyCartActionsEnum {
  // total number
  SetTotalNumber = "SetTotalNumber",
  // items
  SetItems = "SetItems",
  CheckItemIsEmpty = "CheckItemIsEmpty",
  SelectAll = "SelectAll",
  SelectSupplier = "SelectSupplier",
  SelectItem = "SelectItem",
  // ChangeNoteItem = "ChangeNoteItem",

  // ClearSelectedItem = "ClearSelectedItems",
}

// total number
type ResellerMyCartTotalNumberPayload = {
  [ResellerMyCartActionsEnum.SetTotalNumber]: number;
};

export type ResellerMyCartTotalNumberActions =
  ActionMap<ResellerMyCartTotalNumberPayload>[keyof ActionMap<ResellerMyCartTotalNumberPayload>];

// Items
type ResellerMyCartItemsPayload = {
  [ResellerMyCartActionsEnum.SetItems]: IResellerCart[];
  [ResellerMyCartActionsEnum.CheckItemIsEmpty]: boolean;
  [ResellerMyCartActionsEnum.SelectAll]: undefined;
  [ResellerMyCartActionsEnum.SelectSupplier]: number;
  [ResellerMyCartActionsEnum.SelectItem]: number;
  // [ResellerMyCartActionsEnum.SelectAllItems]: undefined;
  // [ResellerMyCartActionsEnum.ChangeNoteItem]: { id: number; note: string };
  // [ResellerMyCartActionsEnum.ClearSelectedItem]: undefined;
};

export type ResellerMyCartItemsActions =
  ActionMap<ResellerMyCartItemsPayload>[keyof ActionMap<ResellerMyCartItemsPayload>];
