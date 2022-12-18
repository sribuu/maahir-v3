import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import {
  EditSupplierProductActionEnum,
  EditSupplierProductActions,
  InitialStateType,
} from "./EditSupplierProduct.types";
import {
  editSupplierProductIdReducer,
  editSupplierProductImagesReducer,
  editSupplierProductItemReducer,
  editSupplierProductSubmitValidationReducer,
  editSupplierProductVariantReducer,
} from "./EditSupplierProduct.reducers";

const initialState: InitialStateType = {
  product_id: null,
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
      value: "",
    },
  },
  variant: [
    {
      id: 0,
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
  { product_id, submit_validation, item, variant, images }: InitialStateType,
  action: EditSupplierProductActions
) => ({
  product_id: editSupplierProductIdReducer(product_id, action),
  submit_validation: editSupplierProductSubmitValidationReducer(
    submit_validation,
    action
  ),
  item: editSupplierProductItemReducer(item, action),
  variant: editSupplierProductVariantReducer(variant, action),
  images: editSupplierProductImagesReducer(images, action),
});

const EditSupplierProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    dispatch({
      type: EditSupplierProductActionEnum.SetSubmitValidation,
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
    <EditSupplierProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </EditSupplierProductContext.Provider>
  );
};

export { EditSupplierProductProvider, EditSupplierProductContext };
