import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchMaahirProvince = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}${APIUrlPath.GetProvince}`)
    .then((res) => res.data);

  return result;
};

export const fetchMaahirDistrict = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}${APIUrlPath.GetDistrict}`)
    .then((res) => res.data);

  return result;
};
