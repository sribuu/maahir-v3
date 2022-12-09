import React, { createContext, useReducer, Dispatch } from "react";
import {
  EditSupplierProductActions,
  InitialStateType,
} from "./EditSupplierProduct.types";
import { editSupplierProductViralProductsReducer } from "./EditSupplierProduct.reducers";

const initialState: InitialStateType = {
  viral_products: [],
};

const EditSupplierProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<EditSupplierProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { viral_products }: InitialStateType,
  action: EditSupplierProductActions
) => ({
  viral_products: editSupplierProductViralProductsReducer(
    viral_products,
    action
  ),
});

const EditSupplierProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <EditSupplierProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </EditSupplierProductContext.Provider>
  );
};

export { EditSupplierProductProvider, EditSupplierProductContext };
