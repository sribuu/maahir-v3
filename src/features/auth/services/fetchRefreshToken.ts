import axios, { AxiosResponse } from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { IRefreshTokenRequest } from "../models/refresh_token";
const axiosApiInstance = axios.create();
export const fetchRefreshToken = async (data: IRefreshTokenRequest) => {
  return await axiosApiInstance
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.RefreshToken}`,
      {
        params: { token: data.refresh_token },
      }
    )

    .then((res) => {
      let response: AxiosResponse<any> = {
        ...res,
        data: {
          ...res.data,
          token: res.headers["x-token"],
          refresh_token: res.headers["x-refresh-token"],
        },
      };
      return response;
    })
    .catch((err) => {
      throw err.response.data;
    });
};
