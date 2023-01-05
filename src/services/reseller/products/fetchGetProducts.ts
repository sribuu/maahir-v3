import { APIUrlPath } from "@/src/core/lib/constants";
import { GetProductsRequestInterface } from "@/src/models/reseller/api/products";
import axios from "axios";
export const fetchGetProducts = async (params: GetProductsRequestInterface) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: params,
      }
    )
    .then((res) => res.data);
