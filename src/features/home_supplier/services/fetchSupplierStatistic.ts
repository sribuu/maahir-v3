import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";

export const fetchSupplierStatistic = async () => {
  await AxiosInterceptor.authRequest();
  await AxiosInterceptor.authResponse();
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetSupplierStatistic}`,
      {
        headers: {},
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(JSON.parse(JSON.stringify(err)), "ini error statistic");
      throw err.response.data;
    });
};
