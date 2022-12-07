import { APIUrlPath } from "@/src/core/lib/constants";
import axios from "axios";
import { IProductGetProductsItemRequest } from "../models/get_product_items";
export const fetchProductGetProducstItem = async (
  data: IProductGetProductsItemRequest
) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: data,
      }
    )
    .then((res) => res.data);
