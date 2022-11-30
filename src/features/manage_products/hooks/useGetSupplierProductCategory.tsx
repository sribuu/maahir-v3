import { fetchProductCategoryList } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { useQuery } from "@tanstack/react-query";
import {
  IGetSupplierProductCategoryErrorResponse,
  IGetSupplierProductCategorySuccessResponse,
} from "../models";

export const useGetSupplierProductCategoryQuery = () =>
  useQuery<
    IGetSupplierProductCategorySuccessResponse[],
    IGetSupplierProductCategoryErrorResponse
  >([ReactQueryKey.GetSupplierProductCategory], () =>
    fetchProductCategoryList()
  );

export const useGetSupplierProductCategoryList = () => {
  const data = useGetSupplierProductCategoryQuery()?.data;
  return data?.map((item) => item.option_name);
};
