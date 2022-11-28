import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IProducts } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";
import { IGetProductByIdRequest } from "../models";

export const useGetProductByIdQuery = (data: IGetProductByIdRequest) =>
  useQuery<IProducts, any, IGetProductByIdRequest>(
    [ReactQueryKey.GetProductById],
    () => fetchProductById(data)
  );
