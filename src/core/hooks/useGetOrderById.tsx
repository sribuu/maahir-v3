import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProducts } from "../lib/models";
import { IOrderResponse } from "../../features/reseller/orders/models";

export const useGetOrderById = (params: { order_code: string }) => {
  return useQuery<IOrderResponse, Error>(
    ["getOrderById"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/orders/view`, {
          headers: { Authorization: "8QhbYqB9X2w9px9c" },
          params: params,
        })
        .then((res) => res.data)
    // {}
  );
};
