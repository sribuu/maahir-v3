import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { GetPricingListRequestInterface } from "@/src/models/reseller/api/shipment";

export const fetchGetPricingList = async (
  params: GetPricingListRequestInterface
) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProductById}`,
      {
        params: params,
      }
    )
    .then((res) => res.data);
