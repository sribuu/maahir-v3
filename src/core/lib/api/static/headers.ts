import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchMaahirHeaders = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}${APIUrlPath.GetHeaders}`)
    .then((res) => res.data);

  return result;
};
