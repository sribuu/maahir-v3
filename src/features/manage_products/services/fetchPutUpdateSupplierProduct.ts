import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IUpdateSupplierProductRequest } from "../models/update_supplier_product";
export const fetchPutUpdateSupplierProduct = async (
  data: IUpdateSupplierProductRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.SupplierProduct}`,
      {
        data: data,
      }
    )
    .then((res) => res.data);
};
