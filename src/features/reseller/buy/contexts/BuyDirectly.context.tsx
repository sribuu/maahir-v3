import React, { createContext, useReducer, Dispatch } from "react";
import { BuyDirectlyActions, InitialStateType } from "./BuyDirectly.types";
import {
  buyDirectlyCalculatorReducer,
  buyDirectlyItemsReducer,
} from "./BuyDirectly.reducers";

const initialState: InitialStateType = {
  items: {
    category_name: "fashion",
    name: "Paket Reseller Parfum Wanita Botol Kaca",
    price: "Rp200.000",
    image: "https://cf.shopee.co.id/file/6528cb47ec580af99291fbe3c5a2cfc5",
    quantity: 1,
    product_id: 1,
    variant_id: 1,
    variant_name: "Hitam",
    note: "",
  },
  calculator: {
    // total_price: "-",
    // total_payment: "-",
    // total_quantity: "-",
    total_price: "Rp20.000",
    total_payment: "Rp20.000",
    total_quantity: "5 Barang",
  },
};

const BuyDirectlyContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<BuyDirectlyActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { items, calculator }: InitialStateType,
  action: BuyDirectlyActions
) => ({
  items: buyDirectlyItemsReducer(items, action),
  calculator: buyDirectlyCalculatorReducer(calculator, action),
});

const BuyDirectlyProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <BuyDirectlyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BuyDirectlyContext.Provider>
  );
};

export { BuyDirectlyProvider, BuyDirectlyContext };
