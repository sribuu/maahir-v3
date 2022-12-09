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
  viral_products: IEditSupplierProductViralProducts[];
}

// State Collection Types consist of:
export interface IEditSupplierProductViralProducts {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export enum EditSupplierProductActionEnum {
  SetViralProducts = "SetViralProducts",
}

// Action Collection Types
export type EditSupplierProductActions =
  EditSupplierProductViralProductsActions;

// Action Collection Types consist of:
// Viral Products
type HomeViralProductsPayload = {
  [EditSupplierProductActionEnum.SetViralProducts]: IEditSupplierProductViralProducts[];
};

export type EditSupplierProductViralProductsActions =
  ActionMap<HomeViralProductsPayload>[keyof ActionMap<HomeViralProductsPayload>];
