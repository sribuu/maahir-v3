type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface InitialStateType {
  search: IProductSearch;
  items: IProductItems[];
  pagination: IProductsPagination;
  filters: IProductsFilter;
  item_counts: IProductsItemCounts;
}
// Action Collection Types consist of:
export interface IProductSearch {
  value: string;
  submit: boolean;
}
export interface IProductItems {
  id: string;
  name: string;
  image: string;
  profit: string;
  price: string;
}

export interface IProductsPagination {
  current_page: number;
  sibbling_count: number;
  total_page: number;
}

export interface IProductsFilter {
  price: {
    selected: string;
    list: string[];
  };
  category: {
    selected: string;
    list: string[];
  };
}

export interface IProductsItemCounts {
  first_item_index: number;
  last_item_index: number;
  total: number;
}

// Actions Enum Group
export enum ProductsActionEnum {
  SetSearchValue = "SetSearchValue",
  SetFindItemTrue = "SetFindItemTrue",
  SetFindItemFalse = "SetFindItemFalse",
  SetProductItems = "SetProductItems",
  SetProductsPagination = "SetProductsPagination",
  ChangeCurrentPage = "ChangeCurrentPage",
  AddCurrentPage = "AddCurrentPage",
  SetPriceFilterList = "SetPriceFilterList",
  SetCategoryFilterList = "SetCategoryFilterList",
  FilterProductsByPrice = "FilterProductsByPrice",
  FilterProductsByCategory = "FilterProductsByCategory",
  SetItemCounts = "SetItemCounts",
}

// Action Collection Types
export type ProductsActions =
  | ProductSearchActions
  | ProductItemsActions
  | ProductsPaginationActions
  | ProductsFilterActions
  | ProductItemCountsActions;

// Action Collection Types consist of:
// Product Items
type ProductSearchPayload = {
  [ProductsActionEnum.SetSearchValue]: string;
  [ProductsActionEnum.SetFindItemTrue]: undefined;
  [ProductsActionEnum.SetFindItemFalse]: undefined;
};

export type ProductSearchActions =
  ActionMap<ProductSearchPayload>[keyof ActionMap<ProductSearchPayload>];

// Product Items
type ProductItemsPayload = {
  [ProductsActionEnum.SetProductItems]: IProductItems[];
};

export type ProductItemsActions =
  ActionMap<ProductItemsPayload>[keyof ActionMap<ProductItemsPayload>];

// Products Pagination
type ProductsPaginationPayload = {
  [ProductsActionEnum.SetProductsPagination]: IProductsPagination;
  [ProductsActionEnum.ChangeCurrentPage]: number;
  [ProductsActionEnum.AddCurrentPage]: undefined;
};

export type ProductsPaginationActions =
  ActionMap<ProductsPaginationPayload>[keyof ActionMap<ProductsPaginationPayload>];

// Products Filter
type ProductsFilterPayload = {
  [ProductsActionEnum.SetPriceFilterList]: string[];
  [ProductsActionEnum.SetCategoryFilterList]: string[];
  [ProductsActionEnum.FilterProductsByPrice]: string;
  [ProductsActionEnum.FilterProductsByCategory]: string;
};

export type ProductsFilterActions =
  ActionMap<ProductsFilterPayload>[keyof ActionMap<ProductsFilterPayload>];

// Item Counts
type ProductsItemCountsPayload = {
  [ProductsActionEnum.SetItemCounts]: IProductsItemCounts;
};

export type ProductItemCountsActions =
  ActionMap<ProductsItemCountsPayload>[keyof ActionMap<ProductsItemCountsPayload>];
