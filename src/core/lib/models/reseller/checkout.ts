export interface IResellerCheckout {
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
  };
  dropshipper: {
    name: string;
    phone_number: string;
  };
  cart: {
    supplier_id: number;
    // additional supplier
    supplier_name: string;
    supplier_initial: string;
    supplier_location: string;
    shipping_detail: {
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
    };
    data: {
      product_id: number;
      // additional product
      product_image: string;
      category_name: string;
      product_name: string;
      profit_value: number;
      retail_price_max: number;
      retail_price_min: number;
      variant_id: number;
      variant_note: string;
      variant_quantity: number;
      variant_name: string;
      // additional variant
      variant_price: number;
      variant_stock: number;
    }[];
  }[];
}
