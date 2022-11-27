export interface IOrders {
  product_id?: number;
  quantity?: number;
  notes?: string;
}

export interface IOrderRequest {
  name?: string;
  email?: string;
  phone_number?: string;
  kecamatan?: string;
  address?: string;
  province?: string;
  postal_code?: string;
  payment_method_id?: number;
  orders?: IOrders[];
}
