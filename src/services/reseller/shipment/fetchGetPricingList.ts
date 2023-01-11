import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { GetPricingListRequestInterface } from "@/src/models/reseller/api/shipment";

export const fetchGetPricingList = async (
  data: GetPricingListRequestInterface
) =>
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}/api/v1/maahir/shipping/rates/couriers`,
      data
    )
    .then((res) => res.data);
