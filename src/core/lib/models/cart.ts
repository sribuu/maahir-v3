import { IGetSupplierProductByIdSuccessResponse } from "@/src/features/manage_products/models";
import { IProducts } from "./products";

export interface IAmount {
  amount: number;
  note?: string;
  variant?: string;
}
export interface ICart
  extends IGetSupplierProductByIdSuccessResponse,
    IAmount {}
