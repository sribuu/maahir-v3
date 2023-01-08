import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";

export const fetchGetPayment = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetPaymentMethod}`
    )
    .then((res) => res.data);
