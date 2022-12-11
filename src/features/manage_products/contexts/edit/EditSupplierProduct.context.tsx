import React, { createContext, useReducer, Dispatch } from "react";
import {
  EditSupplierProductActions,
  InitialStateType,
} from "./EditSupplierProduct.types";
import {
  editSupplierProductImagesReducer,
  editSupplierProductItemReducer,
  editSupplierProductVariantReducer,
} from "./EditSupplierProduct.reducers";

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

const EditSupplierProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<EditSupplierProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { item, variant, images }: InitialStateType,
  action: EditSupplierProductActions
) => ({
  item: editSupplierProductItemReducer(item, action),
  variant: editSupplierProductVariantReducer(variant, action),
  images: editSupplierProductImagesReducer(images, action),
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
