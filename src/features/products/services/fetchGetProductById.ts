import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";

export const fetchProductGetProductById = async (data: { id: number }) =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProductById}`,
      {
        params: data,
      }
    )
    .then((res) => res.data);
