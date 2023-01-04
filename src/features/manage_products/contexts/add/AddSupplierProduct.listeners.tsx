import { useEffect } from "react";
import {
  AddSupplierProductActionEnum,
  AddSupplierProductActions,
  InitialStateType,
} from "./AddSupplierProduct.types";

export const useAddSupplierProductSubmitValidationListeners = (
  state: InitialStateType,
  dispatch: React.Dispatch<AddSupplierProductActions>
) => {
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
};
