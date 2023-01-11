export type PostCreateOrderRequestInterface = {
  payment_method_id: number;
  reseller: {
    name: string;
    email: string;
    phone_number: string;
    address: {
      id: string;
      name: string;
      country_name: string;
      country_code: string;
      administrative_division_level_1_name: string;
      administrative_division_level_1_type: string;
      administrative_division_level_2_name: string;
      administrative_division_level_2_type: string;
      administrative_division_level_3_name: string;
      administrative_division_level_3_type: string;
      postal_code: string;
    };
    detail_address: string;
  };
  dropshipper: {
    name: string;
    phone_number: string;
  };
  cart: {
    supplier_id: number;
    shipping_detail: {
      courier_code: string;
      courier_service_code: string;
    };
    data: {
      product_id: number;
      variant_id: number;
      note: string;
      quantity: number;
    }[];
  }[];
};

export type PostCreateOrderResponseInterface = {
  cost: {
    total_price: number;
    total_quantity: number;
    total_shipment: number;
    total_service: number;
    total: number;
  };
  payment: {
    payment_type: string;
    provider_name: string;
    account_number: string;
    total_amount: number;
    status: string;
    guide_url: string;
    expired_at: string;
    expired_at_formatted: string;
    updated_at: string;
    id_at_vendor: string;
    pic: string;
  };
  customer: {
    name: string;
    email: string;
    phone_number: string;
    address: {
      id: string;
      name: string;
      country_name: string;
      country_code: string;
      administrative_division_level_1_name: string;
      administrative_division_level_1_type: string;
      administrative_division_level_2_name: string;
      administrative_division_level_2_type: string;
      administrative_division_level_3_name: string;
      administrative_division_level_3_type: string;
      postal_code: string;
    };
    detail_address: string;
  };
  dropshipper?: {
    name: string;
    phone_number: string;
  };
  orders: [
    {
      order_code: string;
      supplier_id: number;
      subtotal_price: number;
      shipment: {
        available_for_cash_on_delivery: boolean;
        available_for_proof_of_delivery: boolean;
        available_for_instant_waybill_id: boolean;
        available_for_insurance: boolean;
        company: string;
        courier_name: string;
        courier_code: string;
        courier_service_name: string;
        courier_service_code: string;
        description: string;
        duration: string;
        shipment_duration_range: string;
        shipment_duration_unit: string;
        service_type: string;
        shipping_type: string;
        price: number;
        type: string;
        eta: string;
      };
      products: {
        id: number;
        name: string;
        description: string;
        category_name: string;
        category_id: number;
        cover_image: string;
        detail_images: string[];
        variant_id: number;
        variant_name: string;
        price: number;
        quantity: number;
      }[];
    }
  ];
};
