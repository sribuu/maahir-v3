export interface IOrder {
  address_id: number;
  address: {
    postal_code: string;
    address: string;
    id: number;
    province: string;
    kecamatan: string;
  };
  net_amount: number;
  phone_number: string;
  cancelled_at: null | string;
  price: number;
  done_at: null | string;
  order_code: string;
  payment: {
    created_at: string;
    expired_at: string;
    expired_at_formatted: string;
    id: number;
    id_at_vendor: string;
    payment_method: {
      created_at: string;
      fee_amount: number;
      fee_type: string;
      guide_steps: [];
      id: number;
      id_at_vendor: string;
      payment_type: string;
      pic: string;
      provider_name: string;
      status: string;
      updated_at: string;
      vendor: string;
    };
    payment_order_id: number;
    payment_type: string;
    provider_name: string;
    status: string;
    target_account_number: string;
    total_amount: number;
    updated_at: string;
    user_id: number;
  };
  product_id: number;
  payment_order_id: number;
  order_fees: {
    order_id: number;
    calculation_type: string;
    fee_type: string;
    rate: number;
    total_value: number;
    id: number;
  }[];
  total_amount: number;
  status: string;
  email: string;
  quantity: number;
  product: {
    title: string;
    profit_value: number;
    price: number;
    image: string;
    id: number;
    retail_price_min: number;
    retail_price_max: number;
    is_priority: boolean;
    description: string;
  };
  total_fee: number;
  ordered_at: string;
  processed_at: null | string;
  name: string;
}
