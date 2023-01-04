import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IUpdateSupplierProfileRequest } from "../models";

export const fetchUpdateSupplierProfile = async (
  data: IUpdateSupplierProfileRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.PutUpdateSupplierProfile}`,
      data
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
