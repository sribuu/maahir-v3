import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { MyCartReactQueryKey } from "../constants";
import {
  PostCheckProductsRequestInterface,
  PostCheckProductsResponseInterface,
} from "@/src/models/reseller/api/products";
import { fetchPostCheckProducts } from "@/src/services/reseller/products";
import { ResellerMyCartContext } from "../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../contexts/my_cart/MyCart.types";
import { thousandSeparator } from "@/src/core/utils/formatters";

// Home
export const useHomePostCheckProducts = () => {
  const { state, dispatch } = useContext(ResellerMyCartContext);
  const mutation = useMutation<
    PostCheckProductsResponseInterface,
    any,
    PostCheckProductsRequestInterface
  >(
    [MyCartReactQueryKey.SetCheckout],
    (payload: PostCheckProductsRequestInterface) => {
      console.log(payload, "kepanggil ga");
      return fetchPostCheckProducts(payload);
    },
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: ResellerMyCartActionsEnum.SetItems,
        payload: mutation.data.products.is_available.map((item) => {
          return {
            variant_id: String(item.variant_id),
            selected: false,
            image: item.image,
            category_name: item.category_name,
            product_name: item.name,
            variant_name: item.variant_name,
            price: item.price,
            formatted_price: thousandSeparator(item.price),
            note: item.notes,
            quantity: item.quantity,
          };
        }),
      });
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: ResellerMyCartActionsEnum.SetUnavailableItems,
        payload: mutation.data.products.is_not_available.map((item) => {
          return {
            variant_id: String(item.variant_id),
            category_name: item.category_name,
            product_name: item.name,
            variant_name: item.variant_name,
            price: item.price,
            formatted_price: thousandSeparator(item.price),
            image: item.image,
          };
        }),
      });
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: ResellerMyCartActionsEnum.SetIsAnyUnavailableItems,
        payload: mutation.data.products.is_not_available.length > 0,
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};
