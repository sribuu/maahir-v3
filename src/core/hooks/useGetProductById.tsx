import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProducts } from "../lib/models";

export const useGetProductById = (params: { id: number }) => {
  return useQuery<IProducts[], Error>(["getProductById"], () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products`, {
        headers: { Authorization: "8QhbYqB9X2w9px9c" },
        params: { is_priority: false, ...params },
      })
      .then((res) => res.data)
  );
};
