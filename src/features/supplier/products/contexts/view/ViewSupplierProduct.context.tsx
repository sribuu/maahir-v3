import React, { createContext, useReducer, Dispatch } from "react";
import {
  ViewSupplierProductActions,
  InitialStateType,
} from "./ViewSupplierProduct.types";
import {
  viewSupplierProductSearchReducer,
  viewSupplierProductItemReducer,
  viewSupplierProductPaginationReducer,
  viewSupplierProductTabReducer,
  viewSupplierProductItemCountsReducer,
} from "./ViewSupplierProduct.reducers";

const initialState: InitialStateType = {
  tab: {
    active: 0,
    list: ["Etalase Produk", "Produk Disembunyikan"],
  },
  search: "",
  items: [],
  item_counts: {
    first_item_index: 1,
    last_item_index: 20,
    total: 20,
  },
  pagination: {
    current_page: 1,
    total_page: 10,
    sibbling_count: 2,
  },
};

const ViewSupplierProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ViewSupplierProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { tab, search, items, item_counts, pagination }: InitialStateType,
  action: ViewSupplierProductActions
) => ({
  tab: viewSupplierProductTabReducer(tab, action),
  search: viewSupplierProductSearchReducer(search, action),
  items: viewSupplierProductItemReducer(items, action),
  item_counts: viewSupplierProductItemCountsReducer(item_counts, action),
  pagination: viewSupplierProductPaginationReducer(pagination, action),
});

const ViewSupplierProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ViewSupplierProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ViewSupplierProductContext.Provider>
  );
};

export { ViewSupplierProductProvider, ViewSupplierProductContext };
