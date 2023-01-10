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
    // available items
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
  SelectItem = "SelectItem",

  // unavailable items
  SetUnavailableItems = "SetUnavailableItems",
  SetIsAnyUnavailableItems = "SetIsAnyUnavailableItems",
  ShowUnavailableItems = "ShowUnavailableItems",
}

// total number
type ResellerMyCartTotalNumberPayload = {
  [ResellerMyCartActionsEnum.SetTotalNumber]: number;
};

export type ResellerMyCartTotalNumberActions =
  ActionMap<ResellerMyCartTotalNumberPayload>[keyof ActionMap<ResellerMyCartTotalNumberPayload>];

// Items
type ResellerMyCartItemsPayload = {
  [ResellerMyCartActionsEnum.CheckItemIsEmpty]: boolean;
  // available
  // [ResellerMyCartActionsEnum.SetItems]: IResellerCart[];
  [ResellerMyCartActionsEnum.SetItems]: {
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
  [ResellerMyCartActionsEnum.SelectAll]: undefined;
  [ResellerMyCartActionsEnum.SelectItem]: number;
  // unavailable items
  [ResellerMyCartActionsEnum.SetIsAnyUnavailableItems]: boolean;
  [ResellerMyCartActionsEnum.ShowUnavailableItems]: undefined;
  [ResellerMyCartActionsEnum.SetUnavailableItems]: {
    variant_id: string;
    category_name: string;
    product_name: string;
    variant_name: string;
    price: number;
    formatted_price: string;
    image: string;
  }[];
};

export type ResellerMyCartItemsActions =
  ActionMap<ResellerMyCartItemsPayload>[keyof ActionMap<ResellerMyCartItemsPayload>];
