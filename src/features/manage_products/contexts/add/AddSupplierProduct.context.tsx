import React, { createContext, useReducer, Dispatch } from "react";
import {
  AddSupplierProductActions,
  InitialStateType,
} from "./AddSupplierProduct.types";
import { addSupplierProductViralProductsReducer } from "./AddSupplierProduct.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const AddSupplierProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AddSupplierProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: AddSupplierProductActions
) => ({
  viral_products: addSupplierProductViralProductsReducer(
    viral_products,
    action
  ),
});

const AddSupplierProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AddSupplierProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AddSupplierProductContext.Provider>
  );
};

export { AddSupplierProductProvider, AddSupplierProductContext };
