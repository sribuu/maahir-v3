import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { fetchSaveOrderItem } from "../service";
import { IOrderRequest } from "../models";
import {
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import { useContext, useEffect } from "react";
import { ResellerOrderBuyNowContext } from "../contexts/buy_now/BuyNow.context";
import { v4 as uuid } from "uuid";

export const useBuyNowSaveOrderProcess = () => {
  const { state } = useContext(ResellerOrderBuyNowContext);
  const router = useRouter();
  const orderId = String(uuid());

  const mutation = useMutation<IOrderRequest, IOrderRequest>(
    [ReactQueryKey.SaveOrderItem],
    () => {
      const payload: IOrderRequest = {
        order_id: orderId,
        orders: [
          {
            name: state.item.name,
            product_id: parseInt(
              String(router.query[RouterQueryKey.ProductId])
            ),
            quantity: state.item.quantity,
            notes: state.item.notes,
            price: state.price,
            image: state.item.image,
          },
        ],
      };
      return fetchSaveOrderItem(payload);
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      router.replace({
        pathname: RouterPathName.FillOrderDetail,
        query: {
          [RouterQueryKey.ProductId]: orderId,
        },
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};
