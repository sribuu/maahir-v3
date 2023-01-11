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
    filled: {
      status: false,
    },
    name: {
      change_value: "",
      save_value: "",
      error: true,
    },
    email: {
      change_value: "",
      save_value: "",
      error: true,
    },
    mobile: {
      change_value: "",
      save_value: "",
      error: true,
    },
    address: {
      change_value: "",
      save_value: "",
      selected_index: "-1",
      selected_value: "",
      list: [],
      error: true,
    },
    detail_address: {
      change_value: "",
      save_value: "",
      error: true,
    },
    disabled_save_change: {
      status: true,
    },

    // sample
    // filled: {
    //   status: false,
    // },
    // name: {
    //   change_value: "",
    //   save_value: "Nina Nursita",
    //   error: true,
    // },
    // email: {
    //   change_value: "",
    //   save_value: "ninanurita99@gmail.com",
    //   error: true,
    // },
    // mobile: {
    //   change_value: "",
    //   save_value: "08111773208",
    //   error: true,
    // },
    // address: {
    //   change_value: "",
    //   save_value: "Gambir, Jakarta Pusat, DKI Jakarta. 10130",
    //   selected_index: "-1",
    //   selected_value: "",
    //   list: [],
    //   error: true,
    // },
    // detail_address: {
    //   change_value: "",
    //   save_value: "Jln. Agus Salim, Haji, No. Ganjil 3 - 11A - Kel. Gambir",
    //   error: true,
    // },
    // disabled_save_change: {
    //   status: true,
    // },
  },
  dropshipper: {
    is_dropshipper: false,
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
      order_confirmation: {
        show: true,
        disabled: true,
      },
      continue_payment: {
        show: false,
      },
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
          cta: {
            disabled: false,
          },
          list: [
            {
              courier_code: "",
              courier_service_code: "",
              name: "J&T",
              eta: "Estimasi 3 - 7 Desember",
              price: 43000,
              formatted_price: "Rp43.000",
              selected: false,
            },
            {
              courier_code: "",
              courier_service_code: "",
              name: "Tiki",
              eta: "Estimasi 3 - 7 Desember",
              price: 30000,
              formatted_price: "Rp30.000",
              selected: false,
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
            price: 649999,
            formatted_price: "Rp649.999",
            name: "Paket Reseller Kaos Polos",
            variant: "Hitam",
          },
          {
            photo:
              "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/445174/item/idgoods_09_445174.jpg?width=1600&impolicy=quality_75",
            category: "fashion",
            quantity: "1 Barang",
            price: 649999,
            formatted_price: "Rp649.999",
            name: "Paket Reseller Kaos Polos",
            variant: "Putih",
          },
        ],
      },
      {
        name: "Pesanan 2",
        shipping_options: {
          cta: {
            disabled: true,
          },
          list: [
            {
              courier_code: "",
              courier_service_code: "",
              name: "J&T",
              eta: "Estimasi 3 - 7 Desember",
              price: 43000,
              formatted_price: "Rp43.000",
              selected: false,
            },
            {
              courier_code: "",
              courier_service_code: "",
              name: "Tiki",
              eta: "Estimasi 3 - 7 Desember",
              price: 30000,
              formatted_price: "Rp30.000",
              selected: false,
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
            price: 649999,
            formatted_price: "Rp649.999",
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
