import {
  IProductDetail,
  IProductImages,
  ProductActionEnum,
  ProductActions,
} from "./Product.types";

export const productImagesReducer = (
  state: IProductImages,
  action: ProductActions
) => {
  switch (action.type) {
    case ProductActionEnum.SetImage:
      return action.payload;
    case ProductActionEnum.ChangeZoomImage:
      return {
        ...state,
        zoom: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state: IProductDetail,
  action: ProductActions
) => {
  switch (action.type) {
    case ProductActionEnum.SetDetail:
      return action.payload;
    case ProductActionEnum.ChangeVariant:
      return {
        ...state,
        variant: {
          ...state.variant,
          selected: action.payload,
        },
      };
    case ProductActionEnum.AddQuantity:
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case ProductActionEnum.SubstractQuantity:
      return {
        ...state,
        quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity,
      };
    default:
      return state;
  }
};

// old
// Variant

// type VariantPayload = {
//   [Types.SelectVariant]: string;
// };

// export type VariantActions =
//   ActionMap<VariantPayload>[keyof ActionMap<VariantPayload>];

// export const variantReducer = (state: string, action: ProductActions) => {
//   switch (action.type) {
//     case Types.SelectVariant:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // Variants

// type VariantsPayload = {
//   [Types.SetVariants]: string[];
// };

// export type VariantsActions =
//   ActionMap<VariantsPayload>[keyof ActionMap<VariantsPayload>];

// export const variantsReducer = (state: string[], action: ProductActions) => {
//   switch (action.type) {
//     case Types.SetVariants:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // Images
// type ImagesPayload = {
//   [Types.SetImages]: string[];
// };

// export type ImagesActions =
//   ActionMap<ImagesPayload>[keyof ActionMap<ImagesPayload>];

// export const imagesReducer = (state: string[], action: ProductActions) => {
//   switch (action.type) {
//     case Types.SetImages:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // Quantity
// type ProductQuantityPayload = {
//   [Types.AddQuantity]: undefined;
//   [Types.SubstractQuantity]: undefined;
// };

// export type ProductQuantityActions =
//   ActionMap<ProductQuantityPayload>[keyof ActionMap<ProductQuantityPayload>];

// export const quantityReducer = (state: number, action: ProductActions) => {
//   switch (action.type) {
//     case Types.AddQuantity:
//       return state + 1;
//     case Types.SubstractQuantity:
//       return state > 1 ? state - 1 : state;
//     default:
//       return state;
//   }
// };

// // Product
// type ProductItemPayload = {
//   [Types.Set]: IProducts;
// };

// export type ProductItemActions =
//   ActionMap<ProductItemPayload>[keyof ActionMap<ProductItemPayload>];

// export const productItemReducer = (
//   state: IProducts,
//   action: ProductActions
// ) => {
//   switch (action.type) {
//     case Types.Set:
//       return action.payload;
//     default:
//       return state;
//   }
// };
