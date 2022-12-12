import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import {
  AddSupplierProductActionEnum,
  AddSupplierProductActions,
  InitialStateType,
} from "./AddSupplierProduct.types";
import {
  addSupplierProductImagesReducer,
  addSupplierProductItemReducer,
  addSupplierProductSubmitValidationReducer,
  addSupplierProductVariantReducer,
} from "./AddSupplierProduct.reducers";

const initialState: InitialStateType = {
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
  { submit_validation, item, variant, images }: InitialStateType,
  action: AddSupplierProductActions
) => ({
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

  useEffect(() => {
    dispatch({
      type: AddSupplierProductActionEnum.SetSubmitValidation,
      payload: {
        name: state.item.name.value,
        category: state.item.category.value,
        length: state.item.length.value,
        width: state.item.width.value,
        height: state.item.height.value,
        weight: state.item.weight.value,
        description: state.item.description.value,
        availability: state.item.availability.value,
        variants: state.variant.map((item) => {
          return {
            sku: item.sku.value,
            name: item.variant.value,
            price: item.price.value,
            stock: item.stock.value,
          };
        }),
      },
    });
  }, [
    state.item.name.value,
    state.item.category.value,
    state.item.length.value,
    state.item.width.value,
    state.item.height.value,
    state.item.weight.value,
    state.item.description.value,
    state.item.availability.value,
    state.variant,
  ]);
  return (
    <AddSupplierProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AddSupplierProductContext.Provider>
  );
};

export { AddSupplierProductProvider, AddSupplierProductContext };
