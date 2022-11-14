import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchPaymentMethod = async () =>
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${APIUrlPath.GetPaymentMethod}`)
    .then((res) => res.data);
