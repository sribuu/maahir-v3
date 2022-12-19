import { IProducts } from "@/src/core/lib/models";

export type IProductGetProductsItemRequest = {
  limit: number;
  offset: number;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  title_like?: string | null;
};

export type IProductGetProductsItemResponse = {
  total: number;
  products: IProducts[];
};
