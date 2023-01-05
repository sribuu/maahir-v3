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
  balance: ISupplierHomeBalance[];
  order: ISupplierHomeOrder[];
}

// State Collection Types consist of:
export interface ISupplierHomeBalance {
  name: string;
  price: string;
}

export interface ISupplierHomeOrder {
  name: string;
  quantity: string;
  price: string;
}

export enum SupplierHomeActionEnum {
  SetBalance = "SetBalance",
  SetOrder = "SetOrder",
}

// Action Collection Types
export type SupplierHomeActions =
  | SupplierHomeBalanceActions
  | SupplierHomeOrderActions;

// Action Collection Types consist of:
// Balance
type SupplierHomeBalancePayload = {
  [SupplierHomeActionEnum.SetBalance]: ISupplierHomeBalance[];
};

export type SupplierHomeBalanceActions =
  ActionMap<SupplierHomeBalancePayload>[keyof ActionMap<SupplierHomeBalancePayload>];

// Order
type SupplierHomeOrderPayload = {
  [SupplierHomeActionEnum.SetOrder]: ISupplierHomeOrder[];
};

export type SupplierHomeOrderActions =
  ActionMap<SupplierHomeOrderPayload>[keyof ActionMap<SupplierHomeOrderPayload>];
