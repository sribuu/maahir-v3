import React, { createContext, useReducer, Dispatch } from "react";
import { InitialStateType, ProductsActions } from "./Products.types";
import {
  productItemsReducer,
  productSearchReducer,
  productsFilterReducer,
  productsItemCountsReducer,
  productsPaginationReducer,
} from "./Products.reducers";

const initialState: InitialStateType = {
  items: [],
  search: {
    value: "",
    submit: false,
  },
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
  item_counts: {
    first_item_index: 1,
    last_item_index: 1,
    total: 1,
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
  { search, items, pagination, filters, item_counts }: InitialStateType,
  action: ProductsActions
) => ({
  search: productSearchReducer(search, action),
  items: productItemsReducer(items, action),
  pagination: productsPaginationReducer(pagination, action),
  filters: productsFilterReducer(filters, action),
  item_counts: productsItemCountsReducer(item_counts, action),
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
