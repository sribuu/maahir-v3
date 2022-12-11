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
  viral_products: IResellerOrderFinishPaymentViralProducts[];
}

// State Collection Types consist of:
export interface IResellerOrderFinishPaymentViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum ResellerOrderFinishPaymentActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type ResellerOrderFinishPaymentActions =
  ResellerOrderFinishPaymentViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type ResellerOrderViralProductsPayload = {
  [ResellerOrderFinishPaymentActionEnum.SetViralProducts]: IResellerOrderFinishPaymentViralProducts[];
};

export type ResellerOrderFinishPaymentViralProductsActions =
  ActionMap<ResellerOrderViralProductsPayload>[keyof ActionMap<ResellerOrderViralProductsPayload>];
