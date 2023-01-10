import { createContext, useReducer, Dispatch } from "react";
import {
  resellerMyCartItemsReducer,
  resellerMyCartTotalNumberReducer,
} from "./MyCart.reducers";
import { ResellerMyCartActions } from "./MyCart.types";

import { InitialStateType } from "./MyCart.types";

const initialState: InitialStateType = {
  total_number: 0,
  cart: {
    is_empty: false,
    select_all: false,
    items: [],
    is_any_unavailable_items: true,
    show_unavailable_items: false,
    unavailable_items: [],
    // sample
    // unavailable_items: [
    //   {
    //     category_name: "fashion",
    //     product_name: "Kaos Polos",
    //     variant_name: "Putih",
    //     price: "Rp30.000",
    //     image:
    //       "https://lzd-img-global.slatic.net/g/p/040ef8a16f39d3e3b098f8872a50f4af.jpg_720x720q80.jpg_.webp",
    //   },
    //   {
    //     category_name: "fashion",
    //     product_name: "Kaos Polos",
    //     variant_name: "Hitam",
    //     price: "Rp30.000",
    //     image:
    //       "https://lzd-img-global.slatic.net/g/p/b41d8df69c202b44970baae372113916.jpg_720x720q80.jpg_.webp",
    //   },
    // ],
  },
};

const ResellerMyCartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ResellerMyCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { total_number, cart }: InitialStateType,
  action: ResellerMyCartActions
) => ({
  total_number: resellerMyCartTotalNumberReducer(total_number, action),
  cart: resellerMyCartItemsReducer(cart, action),
});

const ResellerMyCartProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ResellerMyCartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ResellerMyCartContext.Provider>
  );
};

export { ResellerMyCartProvider, ResellerMyCartContext };
