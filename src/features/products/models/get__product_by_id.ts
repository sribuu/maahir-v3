import { IProducts } from "@/src/core/lib/models";
export interface IProductGetProductByIdRequest {
  id: number;
}

export interface IProductGetProductByIdResponse extends IProducts {}
