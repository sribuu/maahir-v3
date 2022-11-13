export interface IPaymentMethodItem {
  // "created_at": "2022-05-24T01:24:26.124506+00:00",
  //         "extra_fields": [
  //             {
  //                 "field_label": "No. Telp",
  //                 "field_name": "phone_number",
  //                 "field_type": "phone"
  //             }
  //         ],
  //         "fee_amount": 1.5,
  //         "fee_in_nominal": null,
  //         "fee_type": "PCT",
  //         "guide_steps": [
  //             "Pilih “SHOPEEPAY” pada menu pembayaran",
  //             "Pastikan saldo SHOPEEPAY kamu cukup untuk transaksi pembayaran",
  //             "Pastikan informasi yang tertera di layar dan total pembayaran sudah benar. Kemudian masukan “PIN SHOPEEPAY”  kamu dan klik “OK”",
  //             "Pembayaran kamu telah berhasil."
  //         ],
  //         "id": 5,
  //         "id_at_vendor": "OVO",
  //         "payment_type": "EWALLET",
  //         "pic": "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/payment/img_ovo.png",
  //         "provider_name": "OVO",
  //         "status": "ACTIVE",
  //         "updated_at": "2022-05-24T01:24:26.124506+00:00",
  //         "vendor": "DURIAN_PAY"
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
}

export interface IPaymentMethodItems {
  items: IPaymentMethodItem[];
}
