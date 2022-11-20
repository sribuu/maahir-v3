import { IProducts } from "./products";

export interface IAmount {
  amount: number;
}
export interface ICart extends IProducts, IAmount {}
