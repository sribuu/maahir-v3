import {
  ProductsActionEnum,
  IProductItems,
  IProductsPagination,
  ProductsActions,
  IProductsFilter,
  IProductsItemCounts,
  IProductSearch,
} from "./Products.types";

// Product Search
export const productSearchReducer = (
  state: IProductSearch,
  action: ProductsActions
) => {
  switch (action.type) {
    case ProductsActionEnum.SetSearchValue:
      return { ...state, value: action.payload };
    case ProductsActionEnum.SetFindItemTrue:
      return { ...state, submit: true };
    case ProductsActionEnum.SetFindItemFalse:
      return { ...state, submit: false };
    default:
      return state;
  }
};

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
    case ProductsActionEnum.AddCurrentPage:
      return {
        ...state,
        current_page: state.current_page + 1,
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
