import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";

export const fetchProvinceList = async () =>
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

export const fetchBankList = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: {
          option_type: "BANK",
        },
      }
    )
    .then((res) => res.data);

export const fetchAddressList = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: {
          option_type: "BANK",
        },
      }
    )
    .then((res) => res.data);
