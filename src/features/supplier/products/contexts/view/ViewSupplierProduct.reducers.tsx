import {
  IViewSupplierItemCounts,
  IViewSupplierProductItem,
  IViewSupplierProductPagination,
  IViewSupplierProductTab,
  ViewSupplierProductActionEnum,
  ViewSupplierProductActions,
} from "./ViewSupplierProduct.types";

// Tab
export const viewSupplierProductTabReducer = (
  state: IViewSupplierProductTab,
  action: ViewSupplierProductActions
) => {
  switch (action.type) {
    case ViewSupplierProductActionEnum.SetActiveTab:
      return { ...state, active: action.payload };
    default:
      return state;
  }
};

// Search
export const viewSupplierProductSearchReducer = (
  state: string,
  action: ViewSupplierProductActions
) => {
  switch (action.type) {
    case ViewSupplierProductActionEnum.SetSearch:
      return action.payload;
    default:
      return state;
  }
};

// Items
export const viewSupplierProductItemReducer = (
  state: IViewSupplierProductItem[],
  action: ViewSupplierProductActions
) => {
  switch (action.type) {
    case ViewSupplierProductActionEnum.SetItems:
      return action.payload;
    default:
      return state;
  }
};

// Item Counts
export const viewSupplierProductItemCountsReducer = (
  state: IViewSupplierItemCounts,
  action: ViewSupplierProductActions
) => {
  switch (action.type) {
    case ViewSupplierProductActionEnum.SetItemCounts:
      return action.payload;
    default:
      return state;
  }
};

// Pagination
export const viewSupplierProductPaginationReducer = (
  state: IViewSupplierProductPagination,
  action: ViewSupplierProductActions
) => {
  switch (action.type) {
    case ViewSupplierProductActionEnum.SetPagination:
      return action.payload;
    case ViewSupplierProductActionEnum.ChangeCurrentPage:
      return {
        ...state,
        current_page: action.payload,
      };
    default:
      return state;
  }
};
