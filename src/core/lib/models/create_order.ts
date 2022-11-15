export interface IRequestCreateOrder {
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

export interface IResponseCreateOrder {
  email: string;
  total_amount: number;
  order_code: string;
  quantity: number;
  address: {
    id: number;
    postal_code: string;
    province: string;
    kecamatan: string;
    address: string;
  };
  name: string;
  delivered_at: null | string;
  product_id: number;
  address_id: number;
  net_amount: number;
  cancelled_at: null | string;
  processed_at: null | string;
  receipt_number: null | string;
  price: number;
  ordered_at: string;
  total_fee: number;
  product: {
    id: number;
    description: string;
    profit_value: number;
    price: number;
    retail_price_max: number;
    is_priority: boolean;
    retail_price_min: number;
    title: string;
    image: string;
  };
  payment_order_id: number;
  status: string;
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
      guide_steps: string[];
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
  done_at: null | string;
  order_fees: [
    {
      rate: number;
      calculation_type: string;
      order_id: number;
      id: number;
      fee_type: string;
      total_value: number;
    }
  ];
  courier_name: null | string;
  phone_number: string;
}
