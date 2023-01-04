import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
import { AxiosInterceptor } from "@/src/core/utils/axios";
import { IPutSupplierProductRequest } from "../models/put_supplier_product";

export const fetchPutUpdateSupplierProduct = async (
  data: IPutSupplierProductRequest
) => {
  await AxiosInterceptor.authRequest();
  return await axios
    .put(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.SupplierProduct}`,
      data
    )
    .then((res) => res.data);
};
