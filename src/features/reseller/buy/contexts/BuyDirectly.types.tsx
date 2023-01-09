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
  items: IBuyDirectlyItems;
  calculator: IBuyDirectlyCalculator;
}

// State Collection Types consist of:

export interface IBuyDirectlyItems {
  category_name: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  product_id: number;
  variant_id: number;
  variant_name: string;
  note: string;
}

export interface IBuyDirectlyCalculator {
  total_price: string;
  total_payment: string;
  total_quantity: string;
  
}

export enum BuyDirectlyActionEnum {
  // Items
  SetItems = "SetItems",
  // Calculator
  SetCalculator = "SetCalculator",
}

// Action Collection Types
export type BuyDirectlyActions =
  | BuyDirectlyItemsActions
  | BuyDirectlyCalculatorActions;

// Action Collection Types consist of:

// Items
type BuyDirectlyItemsPayload = {
  [BuyDirectlyActionEnum.SetItems]: IBuyDirectlyItems;
};

export type BuyDirectlyItemsActions =
  ActionMap<BuyDirectlyItemsPayload>[keyof ActionMap<BuyDirectlyItemsPayload>];

// Calculator
type BuyDirectlyCalculatorPayload = {
  [BuyDirectlyActionEnum.SetCalculator]: IBuyDirectlyCalculator;
};

export type BuyDirectlyCalculatorActions =
  ActionMap<BuyDirectlyCalculatorPayload>[keyof ActionMap<BuyDirectlyCalculatorPayload>];
