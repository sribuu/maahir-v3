import { IProducts } from "@/src/core/lib/models";

export interface IGetSupplierProductByIdSuccessResponse extends IProducts {}

export interface IGetSupplierProductByIdRequest {
  id: number;
}

export interface IGetSupplierProductByIdErrorResponse {
  error_code: string;
  message: string;
}
