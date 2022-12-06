import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import { IProducts } from "@/src/core/lib/models";
import { useRouter } from "next/router";
import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import { useProductGetProductByIdQuery } from "../../hooks/useProductById";
import { useMutateAddProductToCartQuery } from "../../hooks/useProductCart";
import {
  variantReducer,
  quantityReducer,
  Types,
  productItemReducer,
  variantsReducer,
  ProductActions,
  imagesReducer,
  imageReducer,
} from "./Product.reducers";

type InitialStateType = {
  quantity: number;
  variant: string;
  variants: string[];
  image: string;
  images: string[];
  products: IProducts;
};

const initialState: InitialStateType = {
  quantity: 1,
  variant: "",
  variants: [],
  image: "",
  images: [],
  products: {
    title: "",
    profit_value: 0,
    price: 0,
    image: "",
    detail_images: [],
    length: 0,
    width: 0,
    stock: 0,
    height: 0,
    weight: 0,
    id: 0,
    retail_price_min: 0,
    retail_price_max: 0,
    is_priority: false,
    description: "",
    category_name: "",
    category_id: 0,
  },
};

const ProductContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions>;
  onClickBuyNow: () => void;
  onAddToCart: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  onClickBuyNow: () => null,
  onAddToCart: () => null,
});

const mainReducer = (
  { quantity, variant, products, variants, images, image }: InitialStateType,
  action: ProductActions
) => ({
  quantity: quantityReducer(quantity, action),
  variant: variantReducer(variant, action),
  variants: variantsReducer(variants, action),
  image: imageReducer(image, action),
  images: imagesReducer(images, action),
  products: productItemReducer(products, action),
});

const ProductProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const router = useRouter();
  // products id data
  const { data, isSuccess } = useProductGetProductByIdQuery();

  useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: Types.Set, payload: data });
      dispatch({
        type: Types.SetVariants,
        payload: ["white", "blue", "purple"],
      });
      dispatch({
        type: Types.SetImages,
        payload: [
          "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/lemonilo-logo.png",
          "https://shop.maahir.co.id/storage/292/8NhHI5LXtk18wRiXMwuvKvxdKb3mhl-metaU3VhcmFzYSB4IE1hYWhpci0yLnBuZw==-.png",
          "https://shop.maahir.co.id/storage/297/yiMnYvgRbN6WTLYudwPqlOkLQ9KfPo-metaUGFrZXQgS2VtZWphIFZpcmFsLTIucG5n-.png",
        ],
      });
      dispatch({
        type: Types.SetImage,
        payload: data.image,
      });
    }
  }, [data]);

  // push to order
  const onClickBuyNow = () => {
    router.replace({
      pathname: RouterPathName.OrderProduct,
      query: {
        [RouterQueryKey.ProductId]: parseInt(
          String(router.query[RouterQueryKey.ProductId])
        ),
      },
    });
  };

  // add to cart
  const { mutate } = useMutateAddProductToCartQuery();
  const onAddToCart = () => {
    mutate({
      ...state.products,
      amount: state.quantity,
      note: "",
      variant: state.variant,
    });
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, onClickBuyNow, onAddToCart }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
