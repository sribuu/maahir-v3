import { IProducts } from "./products";

export interface IAmount {
  amount: number;
  note?: string;
  variant?: string;
}
export interface ICart extends IProducts, IAmount {}
