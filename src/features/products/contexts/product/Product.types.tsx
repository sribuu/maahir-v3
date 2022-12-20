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
  supplier: IProductSupplierProfile;
  images: IProductImages;
  detail: IProductDetail;
}

// State Collection Types consist of:
export interface IProductImages {
  large: string;
  list: string[];
}

export interface IProductDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  profit: string;
  max_price: string;
  min_price: string;
  variant: {
    name: {
      selected: string;
      list: string[];
    };
    stock: {
      selected: number;
      list: number[];
    };
    price: {
      selected: string;
      list: string[];
    };
  };
  quantity: number;
}

export interface IProductSupplierProfile {
  initial: string;
  name: string;
  location: string;
}

export enum ProductActionEnum {
  // SUPPLIER
  SetSupplier = "SetSupplier",
  // IMAGES
  SetImage = "SetImage",
  ChangeZoomImage = "ChangeZoomImage",
  ChangeVariant = "ChangeVariant",
  AddQuantity = "AddQuantity",
  SubstractQuantity = "SubstractQuantity",

  // DETAIL
  SetDetail = "SetDetail",
}

// Action Collection Types
export type ProductActions =
  | ProductSupplierProfileActions
  | ProductImagesActions
  | ProductDetailActions;

// Action Collection Types consist of:
// Product Supplier Profile
type ProductSupplierProfilePayload = {
  [ProductActionEnum.SetSupplier]: IProductSupplierProfile;
};

export type ProductSupplierProfileActions =
  ActionMap<ProductSupplierProfilePayload>[keyof ActionMap<ProductSupplierProfilePayload>];

// Product Images
type ProductImagesPayload = {
  [ProductActionEnum.SetImage]: IProductImages;
  [ProductActionEnum.ChangeZoomImage]: string;
};

export type ProductImagesActions =
  ActionMap<ProductImagesPayload>[keyof ActionMap<ProductImagesPayload>];

// Product Detail
type ProductDetailPayload = {
  [ProductActionEnum.SetDetail]: IProductDetail;
  [ProductActionEnum.ChangeVariant]: string;
  [ProductActionEnum.AddQuantity]: undefined;
  [ProductActionEnum.SubstractQuantity]: undefined;
};

export type ProductDetailActions =
  ActionMap<ProductDetailPayload>[keyof ActionMap<ProductDetailPayload>];
