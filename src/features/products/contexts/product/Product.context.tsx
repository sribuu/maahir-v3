import React, { createContext, useReducer, Dispatch } from "react";
import { productImagesReducer, productDetailReducer } from "./Product.reducers";
import { InitialStateType, ProductActions } from "./Product.types";

const initialState: InitialStateType = {
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
    price: "",
    max_price: "",
    min_price: "",
    variant: {
      list: [],
      selected: "",
    },
    quantity: 0,
    stock: 0,
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
  { images, detail }: InitialStateType,
  action: ProductActions
) => ({
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
