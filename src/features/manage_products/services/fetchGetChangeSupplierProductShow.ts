import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IChangeSupplierProductShowRequest } from "../models";

export const fetchPostChangeSupplierProductShow = async (
  data: IChangeSupplierProductShowRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.PostChangeSupplierProductShow}`,
      data
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
