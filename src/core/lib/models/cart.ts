import { IProducts } from "./products";

export interface ICart extends IProducts {
  amount: number;
  note?: string;
  variant?: string;
}
