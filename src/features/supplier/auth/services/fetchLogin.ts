import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";

export const fetchLogin = async (data: { email: string; password: string }) =>
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.PostLogin}`,
      data
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
