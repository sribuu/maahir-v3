import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { ICreateOrder } from "../../models";
export const fetchTopThreeViralProducts = async () =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${APIUrlPath.GetProducts}`, {
      params: { is_priority: true, limit: 3, offset: 0 },
    })
    .then((res) => res.data);

export const fetchInfinityListProducts = async (pageParam: number) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${APIUrlPath.GetProducts}`, {
      params: { limit: 16, offset: (pageParam - 1) * 16 },
    })
    .then((res) => res.data);

export const fetchProductById = async (id: number) =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${APIUrlPath.GetProductById}`, {
      params: { id: id },
    })
    .then((res) => res.data);

export const fetchBuyProduct = async (data: ICreateOrder) =>
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}${APIUrlPath.PostBuyProduct}`,
      data
    )
    .then((res) => res.data);
