import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { GetProductRequestInterface } from "@/src/models/reseller/api/products";

export const fetchGetProduct = async (params: GetProductRequestInterface) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProductById}`,
      {
        params: params,
      }
    )
    .then((res) => res.data);
