import { ICart } from "@/src/core/lib/models";

interface ISelected {
  selected: false;
}

export interface ICartItems extends ICart, ISelected {}
