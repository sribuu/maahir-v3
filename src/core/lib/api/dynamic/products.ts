import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
// import { IOrderRequest } from "@/src/features/orders/models";
export const fetchTopThreeViralProducts = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: { is_priority: true, limit: 3, offset: 0 },
      }
    )
    .then((res) => res.data);

interface InfinityListProductsRequest {
  limit?: number;
  offset?: number;
  category_id?: number;
  min_price?: number;
  max_price?: number;
}
export const fetchInfinityListProducts = async (data: {
  page_param: number;
  category_id?: number;
  min_price?: number;
  max_price?: number;
}) => {
  let params: InfinityListProductsRequest = {
    limit: 16,
    offset: (data.page_param - 1) * 16,
  };
  if (data.category_id !== undefined) {
    params = { ...params, category_id: data.category_id };
  }
  if (data.min_price !== undefined) {
    params = { ...params, min_price: data.min_price };
  }
  if (data.max_price !== undefined) {
    params = { ...params, max_price: data.max_price };
  }
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: params,
      }
    )
    .then((res) => res.data);
};

export const fetchProductById = async (data: { id: number }) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProductById}`,
      {
        params: data,
      }
    )
    .then((res) => res.data);

// export const fetchBuyProduct = async (data: IOr) =>
//   await axios
//     .post(
//       `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.PostBuyProduct}`,
//       data
//     )
//     .then((res) => res.data);
