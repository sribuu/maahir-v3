import { IProducts } from "@/src/core/lib/models";

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

export type ProductActions =
  | VariantActions
  | ProductQuantityActions
  | ProductItemActions
  | VariantsActions
  | ImageActions
  | ImagesActions;

export enum Types {
  // variant
  SelectVariant = "SELECT_VARIANT",
  // variants
  SetVariants = "SET_VARIANTS",
  // image
  SetImage = "SET_IMAGE",
  // images
  SetImages = "SET_IMAGES",
  // quantity
  AddQuantity = "ADD_PRODUCT",
  SubstractQuantity = "SUBSTRACT_PRODUCT",
  // product
  Set = "SET_PRODUCT",
}

// Variant

type VariantPayload = {
  [Types.SelectVariant]: string;
};

export type VariantActions =
  ActionMap<VariantPayload>[keyof ActionMap<VariantPayload>];

export const variantReducer = (state: string, action: ProductActions) => {
  switch (action.type) {
    case Types.SelectVariant:
      return action.payload;
    default:
      return state;
  }
};

// Variants

type VariantsPayload = {
  [Types.SetVariants]: string[];
};

export type VariantsActions =
  ActionMap<VariantsPayload>[keyof ActionMap<VariantsPayload>];

export const variantsReducer = (state: string[], action: ProductActions) => {
  switch (action.type) {
    case Types.SetVariants:
      return action.payload;
    default:
      return state;
  }
};

// Images
type ImagesPayload = {
  [Types.SetImages]: string[];
};

export type ImagesActions =
  ActionMap<ImagesPayload>[keyof ActionMap<ImagesPayload>];

export const imagesReducer = (state: string[], action: ProductActions) => {
  switch (action.type) {
    case Types.SetImages:
      return action.payload;
    default:
      return state;
  }
};

// Images
type ImagePayload = {
  [Types.SetImage]: string;
};

export type ImageActions =
  ActionMap<ImagePayload>[keyof ActionMap<ImagePayload>];

export const imageReducer = (state: string, action: ProductActions) => {
  switch (action.type) {
    case Types.SetImage:
      return action.payload;
    default:
      return state;
  }
};

// Quantity
type ProductQuantityPayload = {
  [Types.AddQuantity]: undefined;
  [Types.SubstractQuantity]: undefined;
};

export type ProductQuantityActions =
  ActionMap<ProductQuantityPayload>[keyof ActionMap<ProductQuantityPayload>];

export const quantityReducer = (state: number, action: ProductActions) => {
  switch (action.type) {
    case Types.AddQuantity:
      return state + 1;
    case Types.SubstractQuantity:
      return state > 1 ? state - 1 : state;
    default:
      return state;
  }
};

// Product
type ProductItemPayload = {
  [Types.Set]: IProducts;
};

export type ProductItemActions =
  ActionMap<ProductItemPayload>[keyof ActionMap<ProductItemPayload>];

export const productItemReducer = (
  state: IProducts,
  action: ProductActions
) => {
  switch (action.type) {
    case Types.Set:
      return action.payload;
    default:
      return state;
  }
};
