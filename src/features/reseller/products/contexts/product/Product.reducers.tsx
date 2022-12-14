import {
  IProductDetail,
  IProductImages,
  IProductSupplierProfile,
  ProductActionEnum,
  ProductActions,
} from "./Product.types";

export const productSupplierProfileReducer = (
  state: IProductSupplierProfile,
  action: ProductActions
) => {
  switch (action.type) {
    case ProductActionEnum.SetSupplier:
      return action.payload;
    default:
      return state;
  }
};

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
        large: action.payload,
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
          selected_index: action.payload,
          name: {
            ...state.variant.name,
            selected: state.variant.name.list[action.payload],
          },
          price: {
            ...state.variant.price,
            selected: state.variant.price.list[action.payload],
          },
          stock: {
            ...state.variant.stock,
            selected: state.variant.stock.list[action.payload],
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
