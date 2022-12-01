import { IProducts } from "./products";

export interface IAmount {
  amount: number;
  note?: string;
}
export interface ICart extends IProducts, IAmount {}
