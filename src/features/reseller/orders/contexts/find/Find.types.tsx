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
  viral_products: IResellerOrderFindViralProducts[];
}

// State Collection Types consist of:
export interface IResellerOrderFindViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum ResellerOrderFindActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type ResellerOrderFindActions = ResellerOrderFindViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type ResellerOrderViralProductsPayload = {
  [ResellerOrderFindActionEnum.SetViralProducts]: IResellerOrderFindViralProducts[];
};

export type ResellerOrderFindViralProductsActions =
  ActionMap<ResellerOrderViralProductsPayload>[keyof ActionMap<ResellerOrderViralProductsPayload>];
