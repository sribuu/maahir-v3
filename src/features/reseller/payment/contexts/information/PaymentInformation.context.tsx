import React, { createContext, useReducer, Dispatch } from "react";
import {
  PaymentInformationActions,
  InitialStateType,
} from "./PaymentInformation.types";
import {
  paymentInformationAddressReducer,
  paymentInformationInstructionReducer,
} from "./PaymentInformation.reducers";

const initialState: InitialStateType = {
  instruction: {
    // Virtual account sample
    payment_deadline: "26 Oktober 2022, 14:08:00",
    payment_name: "BNI Virtual Account",
    logo: "https://dip.fisip.unair.ac.id/wp-content/uploads/2021/08/bni.jpg",
    payment_account: "3339998111773208",
    total_payment: "53999",
    total_payment_formatted: "Rp.53.999",
    payment_guide: {
      bank_name: "Mandiri",
      payment_options: [
        "ATM Mandiri",
        "Livin Mandiri",
        "Internet Banking Mandiri",
      ],
      guide: [
        {
          step: 1,
          instruction: "Masukkan kartu ATM dan PIN ATM.",
          highlight: [],
        },
        {
          step: 2,
          instruction: "Pilih menu Bayar/Beli.",
          highlight: [],
        },
        {
          step: 3,
          instruction: "Pilih opsi Lainnya",
          highlight: [],
        },
        {
          step: 4,
          instruction: "Pilih opsi Multipayment.",
          highlight: ["“KE REK. BCA VIRTUAL ACCOUNT“"],
        },
        {
          step: 5,
          instruction: "Masukkan nomor Virtual account",
          highlight: [],
        },
        {
          step: 6,
          instruction: "Klik Benar.",
          highlight: [],
        },
        {
          step: 7,
          instruction:
            "Layar akan menampilkan konfirmasi. Jika sesuai, pilih Ya.",
          highlight: [],
        },
        {
          step: 8,
          instruction: "Simpan bukti transaksi sebagai bukti pembayaran",
          highlight: [],
        },
      ],
    },
    // E Wallet
    // payment_deadline: "26 Oktober 2022, 14:08:00",
    // payment_name: "OVO",
    // logo: "https://i0.wp.com/swanz.id/wp-content/uploads/2020/10/OVO-Logo.jpg?ssl=1",
    // payment_account: "3339998111773208",
    // total_payment: "53999",
    // total_payment_formatted: "Rp.53.999",

    // QRIS
    // payment_deadline: "26 Oktober 2022, 14:08:00",
    // payment_name: "OVO",
    // logo: "/logo/qris.png",
    // payment_account: "https://qris.id/homepage/images/assets/pay/harga/csan-qr-a.jpg",
    // total_payment: "53999",
    // total_payment_formatted: "Rp.53.999",
  },
  address: {
    name: "Nina NR",
    email: "ninanurita99@gmail.com",
    mobile: "08111773208",
    address: "Gambir, Jakarta Pusat, DKI Jakarta. 10130",
    detail_address:
      "Jln. Agus Salim, Haji, No. Ganjil 3 - 11A - Kel. Gambir, Kec. Gambir, JAKARTA PUSAT",
  },
};

const PaymentInformationContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<PaymentInformationActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { instruction, address }: InitialStateType,
  action: PaymentInformationActions
) => ({
  instruction: paymentInformationInstructionReducer(instruction, action),
  address: paymentInformationAddressReducer(address, action),
});

const PaymentInformationProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <PaymentInformationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PaymentInformationContext.Provider>
  );
};

export { PaymentInformationProvider, PaymentInformationContext };
