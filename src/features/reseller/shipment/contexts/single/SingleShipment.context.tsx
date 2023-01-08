import React, { createContext, useReducer, Dispatch } from "react";
import {
  SingleShipmentActions,
  InitialStateType,
} from "./SingleShipment.types";
import {
  singleShipmentPersonalInformationReducer,
  singleShipmentDropshipperReducer,
  singleShipmentOrdersReducer,
} from "./SingleShipment.reducers";

const initialState: InitialStateType = {
  personal_information: {
    modal: {
      open: false,
    },
    // filled: {
    //   status: false,
    // },
    // name: {
    //   change_value: "",
    //   save_value: "",
    // },
    // email: {
    //   change_value: "",
    //   save_value: "",
    // },
    // mobile: {
    //   change_value: "",
    //   save_value: "",
    // },
    // address: {
    //   change_value: "",
    //   save_value: "",
    // },
    // detail_address: {
    //   change_value: "",
    //   save_value: "",
    // },
    filled: {
      status: false,
    },
    name: {
      change_value: "",
      save_value: "Nina Nursita",
    },
    email: {
      change_value: "",
      save_value: "ninanurita99@gmail.com",
    },
    mobile: {
      change_value: "",
      save_value: "08111773208",
    },
    address: {
      change_value: "",
      save_value: "Gambir, Jakarta Pusat, DKI Jakarta. 10130",
      list: [],
    },
    detail_address: {
      change_value: "",
      save_value: "Jln. Agus Salim, Haji, No. Ganjil 3 - 11A - Kel. Gambir",
    },
    disabled_save_change: {
      status: false,
    },
  },
  dropshipper: {
    name: {
      value: "",
    },
    mobile: {
      value: "",
    },
  },
  orders: {
    cta: "Konfirmasi Pesanan",
    summary: {
      total_payment: "Rp2.012.000",
      total_price: "Rp2.000.000",
      total_quantity: "6 Barang",
      // service_cost: "Rp2.0000",
      // shipment_cost: "Rp10.0000",
      service_cost: "-",
      shipment_cost: "-",
    },
    payment: {
      modal: {
        open: false,
      },
      cta: {
        payment: {
          disabled: true,
        },
      },
      list: [
        {
          id: "1",
          logo: "https://i0.wp.com/swanz.id/wp-content/uploads/2020/10/OVO-Logo.jpg?ssl=1",
          name: "OVO",
          selected: false,
          fee: 0,
        },
      ],
    },
    detail: [
      {
        name: "Pesanan 1",
        shipping_options: {
          list: [
            {
              name: "J&T",
              eta: "Estimasi 3 - 7 Desember",
              price: "Rp43.000",
            },
            {
              name: "Tiki",
              eta: "Estimasi 3 - 7 Desember",
              price: "Rp30.000",
            },
          ],
        },
        sub_total_price: "Rp1.529.000",
        items: [
          {
            photo:
              "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/445174/item/idgoods_09_445174.jpg?width=1600&impolicy=quality_75",
            category: "fashion",
            quantity: "1 Barang",
            price: "Rp649.999",
            name: "Paket Reseller Kaos Polos",
            variant: "Hitam",
          },
          {
            photo:
              "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/445174/item/idgoods_09_445174.jpg?width=1600&impolicy=quality_75",
            category: "fashion",
            quantity: "1 Barang",
            price: "Rp649.999",
            name: "Paket Reseller Kaos Polos",
            variant: "Putih",
          },
        ],
      },
      {
        name: "Pesanan 2",
        shipping_options: {
          list: [
            {
              name: "J&T",
              eta: "Estimasi 3 - 7 Desember",
              price: "Rp43.000",
            },
            {
              name: "Tiki",
              eta: "Estimasi 3 - 7 Desember",
              price: "Rp30.000",
            },
          ],
        },
        sub_total_price: "Rp1.529.000",
        items: [
          {
            photo:
              "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/445174/item/idgoods_09_445174.jpg?width=1600&impolicy=quality_75",
            category: "fashion",
            quantity: "1 Barang",
            price: "Rp649.999",
            name: "Paket Reseller Kaos Polos",
            variant: "Hijau",
          },
        ],
      },
    ],
  },
};

const SingleShipmentContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<SingleShipmentActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { personal_information, dropshipper, orders }: InitialStateType,
  action: SingleShipmentActions
) => ({
  personal_information: singleShipmentPersonalInformationReducer(
    personal_information,
    action
  ),
  dropshipper: singleShipmentDropshipperReducer(dropshipper, action),
  orders: singleShipmentOrdersReducer(orders, action),
});

const SingleShipmentProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <SingleShipmentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SingleShipmentContext.Provider>
  );
};

export { SingleShipmentProvider, SingleShipmentContext };
