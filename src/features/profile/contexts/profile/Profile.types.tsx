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
  viral_products: ISupplierProfileViralProducts[];
}

// State Collection Types consist of:
export interface ISupplierProfileViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum SupplierProfileActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type SupplierProfileActions = SupplierProfileViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type HomeViralProductsPayload = {
  [SupplierProfileActionEnum.SetViralProducts]: ISupplierProfileViralProducts[];
};

export type SupplierProfileViralProductsActions =
  ActionMap<HomeViralProductsPayload>[keyof ActionMap<HomeViralProductsPayload>];
