import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { IRequestCreateOrder } from "../../models";
export const fetchTopThreeViralProducts = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: { is_priority: true, limit: 3, offset: 0 },
      }
    )
    .then((res) => res.data);

export const fetchInfinityListProducts = async (pageParam: number) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: { limit: 16, offset: (pageParam - 1) * 16 },
      }
    )
    .then((res) => res.data);

export const fetchProductById = async (id: number) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProductById}`,
      {
        params: { id: id },
      }
    )
    .then((res) => res.data);

export const fetchBuyProduct = async (data: IRequestCreateOrder) =>
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.PostBuyProduct}`,
      data
    )
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
