import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { IRefreshTokenRequest } from "../models/refresh_token";

export const fetchRefreshToken = async (data: IRefreshTokenRequest) => {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.RefreshToken}`,
      {
        params: { token: data.refresh_token },
      }
    )
    .then((res) => {
      return {
        ...res.data,
        token: res.headers["x-token"],
        refresh_token: res.headers["x-refresh-token"],
      };
    })
    .catch((err) => {
      throw err.response.data;
    });
};
