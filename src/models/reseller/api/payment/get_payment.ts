export type GetPaymentRequestInterface = {};

export type GetPaymentResponseInterface = {
  items: {
    created_at: string;
    extra_fields: {
      field_label: string;
      field_name: string;
      field_type: string;
    }[];
    fee_amount: number;
    fee_in_nominal: number | null;
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
  }[];
};
