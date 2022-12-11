import {
  IAddSupplierProductItem,
  AddSupplierProductActionEnum,
  AddSupplierProductActions,
  IAddSupplierProductVariant,
  IAddSupplierProductImages,
} from "./AddSupplierProduct.types";

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
          value: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetWidth:
      return {
        ...state,
        width: {
          ...state.width,
          value: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetHeight:
      return {
        ...state,
        height: {
          ...state.height,
          value: action.payload,
        },
      };
    case AddSupplierProductActionEnum.SetWeight:
      return {
        ...state,
        weight: {
          ...state.weight,
          value: action.payload,
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
            value: value,
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
            value: value,
          },
        };
      });
    case AddSupplierProductActionEnum.SetVariantAvailability:
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
export const addSupplierProductImagesReducer = (
  state: IAddSupplierProductImages,
  action: AddSupplierProductActions
) => {
  switch (action.type) {
    case AddSupplierProductActionEnum.SetImages:
      return action.payload;
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
