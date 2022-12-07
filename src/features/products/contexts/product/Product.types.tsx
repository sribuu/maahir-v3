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
  images: IProductImages;
  detail: IProductDetail;
}
// Action Collection Types consist of:
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
  price: string;
  max_price: string;
  min_price: string;
  variant: {
    list: string[];
    selected: string;
  };
  quantity: number;
  stock: number;
}

export enum ProductActionEnum {
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
export type ProductActions = ProductImagesActions | ProductDetailActions;

// Action Collection Types consist of:
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
