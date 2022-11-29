import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IWithdrawBalanceRequest } from "../models";

export const fetchWithdrawBalance = async (data: IWithdrawBalanceRequest) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.PostWithdrawBalance}`,
      data
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
