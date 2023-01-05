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
  tab: IViewSupplierProductTab;
  search: string;
  items: IViewSupplierProductItem[];
  item_counts: IViewSupplierItemCounts;
  pagination: IViewSupplierProductPagination;
}

// State Collection Types consist of:
export interface IViewSupplierProductTab {
  active: number;
  list: string[];
}

export interface IViewSupplierProductItem {
  image: string;
  product_id: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  variant: {
    total: string;
    list: {
      sku: string;
      name: string;
      price: string;
      stock: number;
    }[];
  };
}

export interface IViewSupplierItemCounts {
  first_item_index: number;
  last_item_index: number;
  total: number;
}

export interface IViewSupplierProductPagination {
  current_page: number;
  sibbling_count: number;
  total_page: number;
}

export enum ViewSupplierProductActionEnum {
  SetActiveTab = "SetActiveTab",
  SetSearch = "SetSearch",
  SetItems = "SetItems",
  SetItemCounts = "SetItemCounts",
  SetPagination = "SetPagination",
  ChangeCurrentPage = "ChangeCurrentPage",
}

// Action Collection Types
export type ViewSupplierProductActions =
  | ViewSupplierProductTabActions
  | ViewSupplierProductSearchActions
  | ViewSupplierProductItemActions
  | ViewSupplierProductItemCountsActions
  | ViewSupplierProductPaginationActions;

// Action Collection Types consist of:
// Search
type ViewSupplierProductTabPayload = {
  [ViewSupplierProductActionEnum.SetActiveTab]: number;
};

export type ViewSupplierProductTabActions =
  ActionMap<ViewSupplierProductTabPayload>[keyof ActionMap<ViewSupplierProductTabPayload>];

// Search
type ViewSupplierProductSearchPayload = {
  [ViewSupplierProductActionEnum.SetSearch]: string;
};

export type ViewSupplierProductSearchActions =
  ActionMap<ViewSupplierProductSearchPayload>[keyof ActionMap<ViewSupplierProductSearchPayload>];

// Items
type ViewSupplierProductItemPayload = {
  [ViewSupplierProductActionEnum.SetItems]: IViewSupplierProductItem[];
};

export type ViewSupplierProductItemActions =
  ActionMap<ViewSupplierProductItemPayload>[keyof ActionMap<ViewSupplierProductItemPayload>];

// Item Counts
type ViewSupplierProductItemCountsPayload = {
  [ViewSupplierProductActionEnum.SetItemCounts]: IViewSupplierItemCounts;
};

export type ViewSupplierProductItemCountsActions =
  ActionMap<ViewSupplierProductItemCountsPayload>[keyof ActionMap<ViewSupplierProductItemCountsPayload>];

// Pagination
type ViewSupplierProductPaginationPayload = {
  [ViewSupplierProductActionEnum.SetPagination]: IViewSupplierProductPagination;
  [ViewSupplierProductActionEnum.ChangeCurrentPage]: number;
};

export type ViewSupplierProductPaginationActions =
  ActionMap<ViewSupplierProductPaginationPayload>[keyof ActionMap<ViewSupplierProductPaginationPayload>];
