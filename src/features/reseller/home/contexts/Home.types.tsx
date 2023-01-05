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
  viral_products: IResellerHomeViralProducts[];
}

// State Collection Types consist of:
export interface IResellerHomeViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
  haveVariant: boolean;
}

export enum ResellerHomeActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type ResellerHomeActions = ResellerHomeViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type HomeViralProductsPayload = {
  [ResellerHomeActionEnum.SetViralProducts]: IResellerHomeViralProducts[];
};

export type ResellerHomeViralProductsActions =
  ActionMap<HomeViralProductsPayload>[keyof ActionMap<HomeViralProductsPayload>];
