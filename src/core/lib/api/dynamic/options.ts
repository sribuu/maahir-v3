import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchProductCategory = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: {
          option_type: "PRODUCT_CATEGORY",
        },
      }
    )
    .then((res) => res.data);

export const fetchProvince = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: {
          option_type: "PROVINCE",
        },
      }
    )
    .then((res) => res.data);

export const fetchDistrict = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: {
          option_type: "KECAMATAN",
        },
      }
    )
    .then((res) => res.data);
