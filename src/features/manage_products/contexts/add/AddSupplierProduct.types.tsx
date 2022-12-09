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
  viral_products: IAddSupplierProductViralProducts[];
}

// State Collection Types consist of:
export interface IAddSupplierProductViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum AddSupplierProductActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type AddSupplierProductActions = AddSupplierProductViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type HomeViralProductsPayload = {
  [AddSupplierProductActionEnum.SetViralProducts]: IAddSupplierProductViralProducts[];
};

export type AddSupplierProductViralProductsActions =
  ActionMap<HomeViralProductsPayload>[keyof ActionMap<HomeViralProductsPayload>];
