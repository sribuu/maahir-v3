export interface IResellerOrder {
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
      administrative_division_level_3_name: "Pesanggrahan";
      administrative_division_level_3_type: "district";
      postal_code: number;
    };
  };
  dropshipper: {
    name: string;
    phone_number: string;
  };
  cart: {
    supplier_id: 1;
    shipping_detail: {
      available_for_cash_on_delivery: true;
      available_for_proof_of_delivery: false;
      available_for_instant_waybill_id: true;
      available_for_insurance: true;
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
      variants: {
        variant_id: number;
        note: string;
        quantity: number;
      }[];
    }[];
  }[];
}
