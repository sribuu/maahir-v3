import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { ICreateSupplierProductRequest } from "../models/create_supplier_product";
export const fetchPostCreateSupplierProduct = async (
  data: ICreateSupplierProductRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.SupplierProduct}`,
      {
        data: data,
      }
    )
    .then((res) => res.data);
};
