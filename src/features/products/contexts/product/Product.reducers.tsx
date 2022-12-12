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
          name: {
            ...state.variant.name,
            selected: action.payload,
          },
          price: {
            ...state.variant.price,
            selected:
              state.variant.price.list[
                state.variant.name.list.findIndex(
                  (item) => item === action.payload
                )
              ],
          },
          stock: {
            ...state.variant.stock,
            selected:
              state.variant.stock.list[
                state.variant.name.list.findIndex(
                  (item) => item === action.payload
                )
              ],
          },
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
