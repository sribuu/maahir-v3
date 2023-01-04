import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchMaahirPriceCategory = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}${APIUrlPath.GetPriceCategory}`)
    .then((res) => res.data);

  return result;
};
