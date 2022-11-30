import { ReactQueryKey } from "@/src/core/lib/constants";
import { useQuery } from "@tanstack/react-query";
import {
  IGetSupplierProductRequest,
  IGetSupplierProductSuccessResponse,
  IGetSupplierProductErrorResponse,
  ISupplierProductItem,
} from "../models";
import { fetchGetSupplierProducts } from "../services";

export const useGetSupplierProductQuery = (data: IGetSupplierProductRequest) =>
  useQuery<
    IGetSupplierProductSuccessResponse,
    IGetSupplierProductErrorResponse
  >([ReactQueryKey.GetSupplierProduct, data], () =>
    fetchGetSupplierProducts(data)
  );

export const useGetSupplierProductList: (
  data: IGetSupplierProductRequest
) => ISupplierProductItem[] = (data: IGetSupplierProductRequest) => {
  const list = useGetSupplierProductQuery(data)?.data;
  return list?.products.map((item) => {
    return {
      image: item.image,
      id: String(item.id),
      name: item.title,
      description: item.description,
      stock: item.stock,
      category: item.category_name,
      action: "",
    };
  });
};
