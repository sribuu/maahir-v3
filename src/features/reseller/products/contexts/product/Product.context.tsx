import React, { createContext, useReducer, Dispatch } from "react";
import {
  productImagesReducer,
  productDetailReducer,
  productSupplierProfileReducer,
} from "./Product.reducers";
import { InitialStateType, ProductActions } from "./Product.types";

const initialState: InitialStateType = {
  supplier: {
    initial: "",
    name: "",
    location: "",
  },
  images: {
    large: "",
    list: [],
  },
  detail: {
    id: "",
    name: "",
    category: "",
    description: "",
    profit: "",
    max_price: "",
    min_price: "",
    variant: {
      selected_index: 0,
      name: {
        selected: "",
        list: [],
      },
      stock: {
        selected: 0,
        list: [],
      },
      price: {
        selected: "",
        list: [],
      },
    },
    quantity: 0,
  },
};

const ProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { supplier, images, detail }: InitialStateType,
  action: ProductActions
) => ({
  supplier: productSupplierProfileReducer(supplier, action),
  images: productImagesReducer(images, action),
  detail: productDetailReducer(detail, action),
});

const ProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
