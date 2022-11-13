import { thousandSeparator } from "@/src/core/utils/formatters";
import axios from "axios";
import { IProducts } from "@/src/core/lib/models";
export const fetchTopThreeViralProducts = async () =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products`, {
      headers: { Authorization: "8QhbYqB9X2w9px9c" },
      params: { is_priority: true, limit: 3, offset: 0 },
    })
    .then((res) => res.data);

export const fetchInfinityListProducts = async (pageParam: number) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products`, {
      headers: { Authorization: "8QhbYqB9X2w9px9c" },
      params: { limit: 16, offset: (pageParam - 1) * 16 },
    })
    .then((res) => res.data);

export const fetchProductById = async (id: number) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products/view`, {
      headers: { Authorization: "8QhbYqB9X2w9px9c" },
      params: { id: id },
    })
    .then((res) => res.data);
