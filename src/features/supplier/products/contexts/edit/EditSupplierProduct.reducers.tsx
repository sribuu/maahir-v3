import { numberFormatters } from "@/src/core/utils/formatters";
import {
  IEditSupplierProductItem,
  EditSupplierProductActionEnum,
  EditSupplierProductActions,
  IEditSupplierProductVariant,
  IEditSupplierProductImages,
  IEditSupplierProductSubmitValidation,
} from "./EditSupplierProduct.types";

// Product ID
export const editSupplierProductIdReducer = (
  state: number,
  action: EditSupplierProductActions
) => {
  switch (action.type) {
    case EditSupplierProductActionEnum.SetProductId:
      return action.payload;
    default:
      return state;
  }
};

// Submit Validation
export const editSupplierProductSubmitValidationReducer = (
  state: IEditSupplierProductSubmitValidation,
  action: EditSupplierProductActions
) => {
  switch (action.type) {
    case EditSupplierProductActionEnum.SetSubmitValidation:
      const validation =
        action.payload.name.length > 0 &&
        action.payload.category.length > 0 &&
        action.payload.length.length > 0 &&
        parseInt(action.payload.length) > 0 &&
        action.payload.width.length > 0 &&
        parseInt(action.payload.width) > 0 &&
        action.payload.height.length > 0 &&
        parseInt(action.payload.height) > 0 &&
        action.payload.weight.length > 0 &&
        parseInt(action.payload.weight) > 0 &&
        action.payload.availability.length > 0 &&
        action.payload.variants.length > 0 &&
        action.payload.variants[0].sku.length > 0 &&
        action.payload.variants[0].name.length > 0 &&
        action.payload.variants[0].price.length > 0 &&
        action.payload.variants[0].stock.length > 0;
      return {
        ...state,
        status: validation,
      };

    default:
      return state;
  }
};

// Item
export const editSupplierProductItemReducer = (
  state: IEditSupplierProductItem,
  action: EditSupplierProductActions
) => {
  switch (action.type) {
    case EditSupplierProductActionEnum.SetItem:
      return action.payload;
    case EditSupplierProductActionEnum.SetName:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetCategory:
      return {
        ...state,
        category: {
          ...state.category,
          value: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetProductCategoryList:
      return {
        ...state,
        category: {
          ...state.category,
          list: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetLength:
      return {
        ...state,
        length: {
          ...state.length,
          value: numberFormatters.thousandSeparator(
            numberFormatters.replaceInitialZeroWithEmptyString(
              numberFormatters.replaceCharWithEmptyString(action.payload)
            )
          ),
        },
      };
    case EditSupplierProductActionEnum.SetWidth:
      return {
        ...state,
        width: {
          ...state.width,
          value: numberFormatters.thousandSeparator(
            numberFormatters.replaceInitialZeroWithEmptyString(
              numberFormatters.replaceCharWithEmptyString(action.payload)
            )
          ),
        },
      };
    case EditSupplierProductActionEnum.SetHeight:
      return {
        ...state,
        height: {
          ...state.height,
          value: numberFormatters.thousandSeparator(
            numberFormatters.replaceInitialZeroWithEmptyString(
              numberFormatters.replaceCharWithEmptyString(action.payload)
            )
          ),
        },
      };
    case EditSupplierProductActionEnum.SetWeight:
      return {
        ...state,
        weight: {
          ...state.weight,
          value: numberFormatters.thousandSeparator(
            numberFormatters.replaceInitialZeroWithEmptyString(
              numberFormatters.replaceCharWithEmptyString(action.payload)
            )
          ),
        },
      };
    case EditSupplierProductActionEnum.SetDescription:
      return {
        ...state,
        description: {
          ...state.description,
          value: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetAvailability:
      return {
        ...state,
        availability: {
          ...state.availability,
          value: action.payload,
        },
      };
    default:
      return state;
  }
};

// Variant
export const editSupplierProductVariantReducer = (
  state: IEditSupplierProductVariant[],
  action: EditSupplierProductActions
) => {
  switch (action.type) {
    case EditSupplierProductActionEnum.SetVariant:
      return action.payload;
    case EditSupplierProductActionEnum.DeleteVariantById:
      return state.filter((_, id) => id !== parseInt(action.payload));
    case EditSupplierProductActionEnum.AddVariant:
      return [
        ...state,
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
      ];
    case EditSupplierProductActionEnum.SetVariantSKU:
      return state.map((item, index) => {
        const value =
          parseInt(action.payload.id) === index
            ? action.payload.value
            : item.sku.value;
        return {
          ...item,
          sku: {
            ...item.sku,
            value: value,
          },
        };
      });
    case EditSupplierProductActionEnum.SetVariantName:
      return state.map((item, index) => {
        const value =
          parseInt(action.payload.id) === index
            ? action.payload.value
            : item.variant.value;
        return {
          ...item,
          variant: {
            ...item.variant,
            value: value,
          },
        };
      });
    case EditSupplierProductActionEnum.SetVariantPrice:
      return state.map((item, index) => {
        const value =
          parseInt(action.payload.id) === index
            ? action.payload.value
            : item.price.value;
        return {
          ...item,
          price: {
            ...item.price,
            value: numberFormatters.thousandSeparator(
              numberFormatters.replaceInitialZeroWithEmptyString(
                numberFormatters.replaceCharWithEmptyString(value)
              )
            ),
          },
        };
      });
    case EditSupplierProductActionEnum.SetVariantStock:
      return state.map((item, index) => {
        const value =
          parseInt(action.payload.id) === index
            ? action.payload.value
            : item.stock.value;
        return {
          ...item,
          stock: {
            ...item.stock,
            value: numberFormatters.thousandSeparator(
              numberFormatters.replaceInitialZeroWithEmptyString(
                numberFormatters.replaceCharWithEmptyString(value)
              )
            ),
          },
        };
      });
    case EditSupplierProductActionEnum.SetVariantAvailability:
      return state.map((item, index) => {
        return {
          ...item,
          action: {
            ...item.action,
            value: item.action.value === "hide" ? "show" : "hide",
          },
        };
      });
    default:
      return state;
  }
};

// Images
export const editSupplierProductImagesReducer = (
  state: IEditSupplierProductImages,
  action: EditSupplierProductActions
) => {
  switch (action.type) {
    case EditSupplierProductActionEnum.SetImages:
      return action.payload;
    case EditSupplierProductActionEnum.SetCoverImage:
      return {
        ...state,
        cover_position: action.payload,
      };
    case EditSupplierProductActionEnum.SetImageList:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
