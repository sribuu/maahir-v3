export interface ICreateOrder {
  name: string;
  email: string;
  phone_number: string;
  product_id: number;
  quantity: number;
  kecamatan: string;
  address: string;
  province: string;
  postal_code: string;
  payment_method_id: number;
}
