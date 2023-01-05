import { IProducts } from "@/src/core/lib/models";

export type IResellerHomeGetProductsItemRequest = {};

export type IResellerHomeGetProductsItemResponse = {
  total: number;
  products: IProducts[];
};
