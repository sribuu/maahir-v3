import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IGetSupplierProductRequest } from "../models";

export const fetchGetSupplierProducts = async (
  data: IGetSupplierProductRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.SupplierProduct}`,
      {
        params: data,
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
