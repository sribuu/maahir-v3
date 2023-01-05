export interface IOrders {
  product_id?: number;
  quantity?: number;
  notes?: string;
  name?: string;
  price?: number;
  image?: string;
  variant?: string;
  stock?: number;
}

export interface IOrderRequest {
  // check again order id
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
  orders?: IOrders[];
}
