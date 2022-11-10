import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProducts } from "../lib/models";
import { IOrder } from "../lib/models/order";

export const useGetOrderById = (params: { order_code: string }) => {
  return useQuery<IOrder, Error>(
    ["getOrderById"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/orders/view`, {
          headers: { Authorization: "8QhbYqB9X2w9px9c" },
          params: params,
        })
        .then((res) => res.data),
    // {}
  );
};
