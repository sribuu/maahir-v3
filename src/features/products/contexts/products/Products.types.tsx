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
  items: IProductItems[];
  pagination: IProductsPagination;
  filters: IProductsFilter;
}
// Action Collection Types consist of:
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

// Actions Enum Group
export enum ProductsActionEnum {
  SetProductItems = "SetProductItems",
  SetProductsPagination = "SetProductsPagination",
  ChangeCurrentPage = "ChangeCurrentPage",
  SetPriceFilterList = "SetPriceFilterList",
  SetCategoryFilterList = "SetCategoryFilterList",
  FilterProductsByPrice = "FilterProductsByPrice",
  FilterProductsByCategory = "FilterProductsByCategory",
}

// Action Collection Types
export type ProductsActions =
  | ProductItemsActions
  | ProductsPaginationActions
  | ProductsFilterActions;

// Action Collection Types consist of:
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
