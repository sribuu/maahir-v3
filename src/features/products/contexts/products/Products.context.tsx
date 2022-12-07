import React, { createContext, useReducer, Dispatch } from "react";
import { InitialStateType, ProductsActions } from "./Products.types";
import {
  productItemsReducer,
  productsFilterReducer,
  productsPaginationReducer,
} from "./Products.reducers";

const initialState: InitialStateType = {
  items: [],
  pagination: {
    current_page: 1,
    total_page: 10,
    sibbling_count: 2,
  },
  filters: {
    price: {
      selected: "",
      list: [],
    },
    category: {
      selected: "",
      list: [],
    },
  },
};

const ProductsContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { items, pagination, filters }: InitialStateType,
  action: ProductsActions
) => ({
  items: productItemsReducer(items, action),
  pagination: productsPaginationReducer(pagination, action),
  filters: productsFilterReducer(filters, action),
});

const ProductsProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
