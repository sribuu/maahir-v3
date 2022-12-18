import { ICart, IProducts } from "@/src/core/lib/models";

export interface ResellerCartCreateOrderItemRequest {
  order_id?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  payment_method?: {
    id?: number;
    logo?: string;
    name?: string;
  };
  dropshipper?: {
    name?: string;
    phonenumber?: string;
  };
  orders?: ICart[];
}

export interface ResellerCartCreateOrderItemResponse {
  order_id?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  payment_method?: {
    id?: number;
    logo?: string;
    name?: string;
  };
  dropshipper?: {
    name?: string;
    phonenumber?: string;
  };
  orders?: ICart[];
}
