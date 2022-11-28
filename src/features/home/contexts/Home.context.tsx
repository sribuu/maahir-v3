import React, { createContext, useReducer, Dispatch } from "react";
import {
  productReducer,
  shoppingCartReducer,
  ProductActions,
  ShoppingCartActions,
} from "./Home.reducers";

type ProductType = {
  id: number;
  name: string;
  price: number;
};

type InitialStateType = {
  hero: {
    headline: string;
    description: string;
    cta_button: {
      label: string;
    };
  };
};

const initialState: InitialStateType = {
  //   products: [],
  //   shoppingCart: 0,

  //  hero
  hero: {
    headline: "Siap Jualan Produk Viral Dari Mana Aja, Kapan Aja!",
    description: "Mau mulai jualan sekarang?",
    cta_button: {
      label: "Gabung grup jualan Di Maahir",
    },
  },
};

const HomeContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions | ShoppingCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    hero,
  }: // products, shoppingCart
  InitialStateType,
  action: ProductActions | ShoppingCartActions
) => ({
  //   products: productReducer(products, action),
  //   shoppingCart: shoppingCartReducer(shoppingCart, action),
  ...initialState,
});

const HomeProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
