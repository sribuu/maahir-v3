import { IProducts } from "@/src/core/lib/models";

export interface IGetSupplierProductSuccessResponse {
  total: number;
  products: IProducts[];
}

export interface IGetSupplierProductRequest {
  limit: number;
  offset: number;
  is_show: boolean;
  title_like?: string;
}

export interface IGetSupplierProductErrorResponse {
  error_code: string;
  message: string;
}
