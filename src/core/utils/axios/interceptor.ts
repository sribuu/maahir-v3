import {
  IRefreshTokenSuccessResponse,
  IToken,
} from "@/src/features/auth/models";
import {
  fetchGetSupplierCredentials,
  fetchRefreshToken,
  fetchSetSupplierCredentials,
} from "@/src/features/auth/services";
import axios, { AxiosResponse } from "axios";
import moment from "moment";

export const AxiosInterceptor = {
  async authRequest() {
    await axios.interceptors.request.use(async (request) => {
      const credentials: IToken | null = await fetchGetSupplierCredentials();
      //   console.log(credentials, "ini credentials");
      if (credentials === null) {
        return request;
      } else {
        // if (
        //   moment(credentials.expired_date).diff(moment(), "minutes") < 1 &&
        //   moment(credentials.expired_date).diff(moment(), "seconds") > 0
        // ) {
        //   await fetchRefreshToken({ refresh_token: credentials.refresh_token })
        //     .then(async (res: AxiosResponse<IRefreshTokenSuccessResponse>) => {
        //       console.log("ini belum di save");
        //       await fetchSetSupplierCredentials({
        //         token: res.data.token,
        //         refresh_token: res.data.refresh_token,
        //         expires_in: parseInt(res.data.expires_in),
        //         expired_date: moment()
        //           .add(parseInt(res.data.expires_in), "seconds")
        //           .format("YYYY-MM-DD hh:mm:ss"),
        //       })
        //         .then((credentialsRes: IToken) => {
        //           console.log("ini sudah di save");
        //           request.headers["Authorization"] = `Bearer ${res.data.token}`;
        //           return request;
        //         })
        //         .catch((e) => request);
        //     })
        //     .catch((_) => request);

        //   //   request.headers["Authorization"] = `Bearer ${credentials.token}`;
        //   //   console.log("ini request", request.headers["Authorization"]);
        //   //   return request;
        // } else if (
        //   moment(credentials.expired_date).diff(moment(), "seconds") <= 0
        // ) {
        //   console.log("ini kasus 2");
        //   return request;
        // } else {
        //   console.log("ini kasus 3");
        //   request.headers["Authorization"] = `Bearer ${credentials.token}`;
        //   return request;
        // }

        request.headers["Authorization"] = `Bearer ${credentials.token}`;
        return request;
      }
    });
  },
};
