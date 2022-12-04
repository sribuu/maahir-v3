export interface IOrders {
  product_id?: number;
  quantity?: number;
  notes?: string;
  name?: string;
  price?: number;
}

export interface IOrderRequest {
  // check again order id
  order_id?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  // payment_method_id?: number;
  payment_method?: {
    id?: number;
    logo?: string;
    name?: string;
  };
  orders?: IOrders[];
}
