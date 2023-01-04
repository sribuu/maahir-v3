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
  is_empty: boolean;
  items: IResellerCartItems[];
  total_number: number;
}

// State Collection Types consist of:
export interface IResellerCartItems {
  category_name: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  product_id: number;
  variant_id: number;
}

export enum ResellerCartItemsActionEnum {
  // IsEmpty
  SetIsEmpty = "SetIsEmpty",
  // TotalNumber
  SetTotalNumber = "SetTotalNumber",
  // Items
  SetItems = "SetItems",
}

// Action Collection Types
export type ResellerCartActions =
  | ResellerCartIsEmptyActions
  | ResellerCartTotalNumberActions
  | ResellerCartItemsActions;

// Action Collection Types consist of:
// IsEmpty
type ResellerCartIsEmptyPayload = {
  [ResellerCartItemsActionEnum.SetIsEmpty]: boolean;
};

export type ResellerCartIsEmptyActions =
  ActionMap<ResellerCartIsEmptyPayload>[keyof ActionMap<ResellerCartIsEmptyPayload>];

// Total Number
type ResellerCartTotalNumberPayload = {
  [ResellerCartItemsActionEnum.SetTotalNumber]: number;
};

export type ResellerCartTotalNumberActions =
  ActionMap<ResellerCartTotalNumberPayload>[keyof ActionMap<ResellerCartTotalNumberPayload>];

// Items
type ResellerCartItemsPayload = {
  [ResellerCartItemsActionEnum.SetItems]: IResellerCartItems[];
};

export type ResellerCartItemsActions =
  ActionMap<ResellerCartItemsPayload>[keyof ActionMap<ResellerCartItemsPayload>];
