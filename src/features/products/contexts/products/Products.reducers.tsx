import {
  ProductsActionEnum,
  IProductItems,
  IProductsPagination,
  ProductsActions,
  IProductsFilter,
  IProductsItemCounts,
} from "./Products.types";

// Product Items
export const productItemsReducer = (
  state: IProductItems[],
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetProductItems:
      return action.payload;
    default:
      return state;
  }
};

// Products Pagination
export const productsPaginationReducer = (
  state: IProductsPagination,
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetProductsPagination:
      return action.payload;
    case ProductsActionEnum.ChangeCurrentPage:
      return {
        ...state,
        current_page: action.payload,
      };
    default:
      return state;
  }
};

// Products Filter
export const productsFilterReducer = (
  state: IProductsFilter,
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetPriceFilterList:
      return {
        ...state,
        price: {
          ...state.price,
          list: action.payload,
        },
      };
    case ProductsActionEnum.SetCategoryFilterList:
      return {
        ...state,
        category: {
          ...state.category,
          list: action.payload,
        },
      };

    case ProductsActionEnum.FilterProductsByPrice:
      return {
        ...state,
        price: {
          ...state.price,
          selected: action.payload,
        },
      };
    case ProductsActionEnum.FilterProductsByCategory:
      return {
        ...state,
        category: {
          ...state.category,
          selected: action.payload,
        },
      };
    default:
      return state;
  }
};

// Item Counts
export const productsItemCountsReducer = (
  state: IProductsItemCounts,
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetItemCounts:
      return action.payload;
    default:
      return state;
  }
};
