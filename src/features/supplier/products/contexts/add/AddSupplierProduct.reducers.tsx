import { numberFormatters } from "@/src/core/utils/formatters";
import {
  IAddSupplierProductItem,
  AddSupplierProductActionEnum,
  AddSupplierProductActions,
  IAddSupplierProductVariant,
  IAddSupplierProductImages,
  IAddSupplierProductSubmitValidation,
  IAddSupplierProductNotification,
} from "./AddSupplierProduct.types";

// Notification
export const addSupplierProductNotificationReducer = (
  state: IAddSupplierProductNotification,
  action: AddSupplierProductActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetNotification:
      return action.payload;
    case AddSupplierProductActionEnum.CloseNotification:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

// Submit Validation
export const addSupplierProductSubmitValidationReducer = (
  state: IAddSupplierProductSubmitValidation,
  action: AddSupplierProductActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetSubmitValidation:
      const validation =
        action.payload.name.length > 0 &&
        action.payload.category.length > 0 &&
        parseInt(
          numberFormatters.thousandSeparatorToNumber(action.payload.length)
        ) > 0 &&
        parseInt(
          numberFormatters.thousandSeparatorToNumber(action.payload.width)
        ) > 0 &&
        parseInt(
          numberFormatters.thousandSeparatorToNumber(action.payload.height)
        ) > 0 &&
        parseInt(
          numberFormatters.thousandSeparatorToNumber(action.payload.weight)
        ) > 0 &&
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
export const addSupplierProductItemReducer = (
  state: IAddSupplierProductItem,
  action: AddSupplierProductActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetItem:
      return action.payload;
    case AddSupplierProductActionEnum.SetName:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetCategory:
      return {
        ...state,
        category: {
          ...state.category,
          value: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetProductCategoryList:
      return {
        ...state,
        category: {
          ...state.category,
          list: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetLength:
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
    case AddSupplierProductActionEnum.SetWidth:
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
    case AddSupplierProductActionEnum.SetHeight:
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
    case AddSupplierProductActionEnum.SetWeight:
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
    case AddSupplierProductActionEnum.SetDescription:
      return {
        ...state,
        description: {
          ...state.description,
          value: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetAvailability:
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
export const addSupplierProductVariantReducer = (
  state: IAddSupplierProductVariant[],
  action: AddSupplierProductActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetVariant:
      return action.payload;
    case AddSupplierProductActionEnum.AddVariant:
      return [
        ...state,
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
      ];
    case AddSupplierProductActionEnum.SetVariantSKU:
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
    case AddSupplierProductActionEnum.DeleteVariantById:
      return state.filter((_, id) => id !== parseInt(action.payload));

    case AddSupplierProductActionEnum.SetVariantName:
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
    case AddSupplierProductActionEnum.SetVariantPrice:
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
    case AddSupplierProductActionEnum.SetVariantStock:
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
    case AddSupplierProductActionEnum.SetVariantAvailability:
      return state.map((item) => {
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
export const addSupplierProductImagesReducer = (
  state: IAddSupplierProductImages,
  action: AddSupplierProductActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetImages:
      return action.payload;
    case AddSupplierProductActionEnum.SetErrorImages:
      return {
        ...state,
        error: {
          ...state.error,
          ...action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetCoverImage:
      return {
        ...state,
        cover_position: action.payload,
      };
    case AddSupplierProductActionEnum.SetImageList:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
