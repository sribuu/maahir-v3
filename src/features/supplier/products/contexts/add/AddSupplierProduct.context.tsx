import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import {
  AddSupplierProductActions,
  InitialStateType,
} from "./AddSupplierProduct.types";
import {
  addSupplierProductImagesReducer,
  addSupplierProductItemReducer,
  addSupplierProductNotificationReducer,
  addSupplierProductSubmitValidationReducer,
  addSupplierProductVariantReducer,
} from "./AddSupplierProduct.reducers";
import { useAddSupplierProductSubmitValidationListeners } from "./AddSupplierProduct.listeners";

const initialState: InitialStateType = {
  notification: {
    open: false,
    success: false,
  },
  submit_validation: {
    status: false,
  },
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
      value: "Tampilkan",
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
    error: {
      status: true,
      message: "",
    },
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
  { notification, submit_validation, item, variant, images }: InitialStateType,
  action: AddSupplierProductActions
) => ({
  notification: addSupplierProductNotificationReducer(notification, action),
  submit_validation: addSupplierProductSubmitValidationReducer(
    submit_validation,
    action
  ),
  item: addSupplierProductItemReducer(item, action),
  variant: addSupplierProductVariantReducer(variant, action),
  images: addSupplierProductImagesReducer(images, action),
});

const AddSupplierProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  useAddSupplierProductSubmitValidationListeners(state, dispatch);

  return (
    <AddSupplierProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AddSupplierProductContext.Provider>
  );
};

export { AddSupplierProductProvider, AddSupplierProductContext };
