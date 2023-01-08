export type GetPricingListRequestInterface = {
  orders: {
    product_id: number;
    quantity: number;
  }[];
  destination_area_id: string;
};

export type GetPricingListResponseInterface = {
  name: string;
  service_type: string;
  data: {
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
  }[];
};
