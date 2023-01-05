import {
  IRefreshTokenSuccessResponse,
  IToken,
} from "@/src/features/supplier/auth/models";
import {
  fetchGetSupplierCredentials,
  fetchRefreshToken,
  fetchSetSupplierCredentials,
} from "@/src/features/supplier/auth/services";
import axios, { AxiosResponse } from "axios";
import moment from "moment";

var counter = 0;
export const AxiosInterceptor = {
  async authRequest() {
    await axios.interceptors.request.use(async (request) => {
      console.log("request config", request);
      const credentials: IToken | null = await fetchGetSupplierCredentials();
      if (credentials === null) {
        return request;
      } else {
        request.headers["Authorization"] = `Bearer ${credentials.token}`;
        return request;
      }
    });
  },
  async authResponse() {
    await axios.interceptors.response.use(async (response) => {
      const credentials: IToken | null = await fetchGetSupplierCredentials();
      // let counter = 0;
      console.log("counter atas ", counter);
      if (response.status === 200 && counter === 0) {
        const originalRequest = response.config;
        console.log("response config", response.config);
        const refreshTokenResponse: AxiosResponse<any> =
          await fetchRefreshToken({
            refresh_token: credentials.refresh_token,
          });
        counter = counter + 1;
        console.log("refresh token", refreshTokenResponse);
        console.log("counter bawah", counter);
        const test1 = await fetchGetSupplierCredentials();
        console.log("storage 1", test1);
        if (refreshTokenResponse.status === 200) {
          console.log("keexecute ga", counter);
          await fetchSetSupplierCredentials({
            token: refreshTokenResponse.data.token,
            refresh_token: refreshTokenResponse.data.refresh_token,
            expires_in: parseInt(refreshTokenResponse.data.expires_in),
            expired_date: moment()
              .add(parseInt(refreshTokenResponse.data.expires_in), "seconds")
              .format("YYYY-MM-DD hh:mm:ss"),
          });
          const test2 = await fetchGetSupplierCredentials();
          console.log("storage 2", test2);
          console.log(originalRequest, "ini apa ya request akhir");
          return await axios.request({
            url: originalRequest.url,
            data: originalRequest?.data,
            params: originalRequest?.params,
            method: originalRequest.method,
            headers: {
              Authorization: `Bearer${test2.token}`,
            },
          });
        } else {
          return response;
        }
      } else {
        return response;
      }
    });
  },
};
