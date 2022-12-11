import {
  IEditSupplierProductItem,
  EditSupplierProductActionEnum,
  EditSupplierProductActions,
  IEditSupplierProductVariant,
  IEditSupplierProductImages,
} from "./EditSupplierProduct.types";

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
          value: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetWidth:
      return {
        ...state,
        width: {
          ...state.width,
          value: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetHeight:
      return {
        ...state,
        height: {
          ...state.height,
          value: action.payload,
        },
      };
    case EditSupplierProductActionEnum.SetWeight:
      return {
        ...state,
        weight: {
          ...state.weight,
          value: action.payload,
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
            value: value,
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
            value: value,
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
