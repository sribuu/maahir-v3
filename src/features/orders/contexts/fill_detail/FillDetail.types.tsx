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
  viral_products: IResellerOrderDetailInformationViralProducts[];
}

// State Collection Types consist of:
export interface IResellerOrderDetailInformationViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum ResellerOrderDetailInformationActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type ResellerOrderDetailInformationActions =
  ResellerOrderDetailInformationViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type HomeViralProductsPayload = {
  [ResellerOrderDetailInformationActionEnum.SetViralProducts]: IResellerOrderDetailInformationViralProducts[];
};

export type ResellerOrderDetailInformationViralProductsActions =
  ActionMap<HomeViralProductsPayload>[keyof ActionMap<HomeViralProductsPayload>];
