import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { GetProductCategoryRequestInterface } from "@/src/models/reseller/api/products";
export const fetchGetProductCategory = async (
  params: GetProductCategoryRequestInterface
) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: params,
      }
    )
    .then((res) => res.data);
