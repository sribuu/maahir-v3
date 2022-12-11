import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IUploadSupplierProductImageRequest } from "../models";
export const fetchPostUploadSupplierProductImage = async (
  data: IUploadSupplierProductImageRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.UploadSupplierProductImages}`,
      {
        data: data,
      }
    )
    .then((res) => res.data);
};
