import React, { createContext, useReducer, Dispatch } from "react";
import {
  AddSupplierProductActions,
  InitialStateType,
} from "./AddSupplierProduct.types";
import {
  addSupplierProductImagesReducer,
  addSupplierProductItemReducer,
  addSupplierProductVariantReducer,
} from "./AddSupplierProduct.reducers";

const initialState: InitialStateType = {
  item: {
    name: {
      value: "",
    },
    category: {
      list: [],
      value: "",
    },
    length: {
      value: "",
    },
    width: {
      value: "",
    },
    height: {
      value: "",
    },
    weight: {
      value: "",
    },
    description: {
      value: "",
    },
    availability: {
      value: "",
    },
  },
  variant: [
    {
      sku: {
        placeholder: "SKU",
        value: "",
      },
      variant: {
        placeholder: "Varian",
        value: "",
      },
      price: {
        placeholder: "Harga",
        value: "",
      },
      stock: {
        placeholder: "Stock",
        value: "",
      },
      action: {
        placeholder: "",
        value: "show",
      },
    },
  ],
  images: {
    cover_image_position: 0,
    list: [],
  },
};

const AddSupplierProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AddSupplierProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { item, variant, images }: InitialStateType,
  action: AddSupplierProductActions
) => ({
  item: addSupplierProductItemReducer(item, action),
  variant: addSupplierProductVariantReducer(variant, action),
  images: addSupplierProductImagesReducer(images, action),
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
