import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchOrderById = async (data: string) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOrder}`,
      {
        params: {
          order_code: data,
        },
      }
    )
    .then((res) => res.data);
