import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";

export const fetchGetSupplierProfile = async () => {
  await AxiosInterceptor.authRequest();
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetSupplierProfile}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
