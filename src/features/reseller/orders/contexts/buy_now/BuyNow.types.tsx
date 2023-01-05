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

// State Collection Types
export interface InitialStateType {
  price: number;
  item: IResellerOrderBuyNowItem[];
  summary: IResellerOrderBuyNowSummary;
}

// State Collection Types consist of:
export interface IResellerOrderBuyNowItem {
  supplier_name: string;
  supplier_initial: string;
  supplier_location: string;
  data: {
    name: string;
    image: string;
    price: string;
    quantity: number;
    notes: string;
  }[];
}

export interface IResellerOrderBuyNowSummary {
  quantity: number;
  sub_total_price: string;
  total_price: string;
}

export enum ResellerOrderBuyNowActionEnum {
  // Price
  SetPrice = "SetPrice",
  // Item
  SetItem = "SetItem",
  SetItemQuantity = "SetItemQuantity",
  SetItemNotes = "SetItemNotes",

  // Summary
  SetSummary = "SetSummary",
  SetSummaryQuantity = "SetSummaryQuantity",
}

// Action Collection Types
export type ResellerOrderBuyNowActions =
  | ResellerOrderBuyNowPriceActions
  | ResellerOrderBuyNowItemActions
  | ResellerOrderBuyNowSummaryActions;

// Action Collection Types consist of:
// Price
type ResellerOrderBuyNowPricePayload = {
  [ResellerOrderBuyNowActionEnum.SetPrice]: number;
};

export type ResellerOrderBuyNowPriceActions =
  ActionMap<ResellerOrderBuyNowPricePayload>[keyof ActionMap<ResellerOrderBuyNowPricePayload>];

// Item
type ResellerOrderBuyNowItemPayload = {
  [ResellerOrderBuyNowActionEnum.SetItem]: IResellerOrderBuyNowItem[];
  [ResellerOrderBuyNowActionEnum.SetItemQuantity]: number;
  [ResellerOrderBuyNowActionEnum.SetItemNotes]: string;
};

export type ResellerOrderBuyNowItemActions =
  ActionMap<ResellerOrderBuyNowItemPayload>[keyof ActionMap<ResellerOrderBuyNowItemPayload>];

// Summary
type ResellerOrderBuyNowSummaryPayload = {
  [ResellerOrderBuyNowActionEnum.SetSummary]: IResellerOrderBuyNowSummary;
  [ResellerOrderBuyNowActionEnum.SetSummaryQuantity]: {
    quantity: number;
    price: number;
  };
};

export type ResellerOrderBuyNowSummaryActions =
  ActionMap<ResellerOrderBuyNowSummaryPayload>[keyof ActionMap<ResellerOrderBuyNowSummaryPayload>];
