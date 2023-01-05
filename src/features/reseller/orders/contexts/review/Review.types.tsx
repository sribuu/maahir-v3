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
  viral_products: IResellerOrderReviewViralProducts[];
}

// State Collection Types consist of:
export interface IResellerOrderReviewViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum ResellerOrderReviewActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type ResellerOrderReviewActions =
  ResellerOrderReviewViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type ResellerOrderViralProductsPayload = {
  [ResellerOrderReviewActionEnum.SetViralProducts]: IResellerOrderReviewViralProducts[];
};

export type ResellerOrderReviewViralProductsActions =
  ActionMap<ResellerOrderViralProductsPayload>[keyof ActionMap<ResellerOrderViralProductsPayload>];
