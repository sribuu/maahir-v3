import { fetchInfinityListProducts } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IProducts } from "@/src/core/lib/models";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useState } from "react";

export interface IProductsQueryParams {
  page_param: number;
  category_id?: number;
  max_price?: number;
  min_price?: number;
}

export const useProductsQuery = (params: IProductsQueryParams) =>
  useInfiniteQuery<IProducts[], IProductsQueryParams>({
    queryKey: [ReactQueryKey.GetInfinityProductList, params],
    queryFn: ({
      queryKey,
    }: QueryFunctionContext<[string, IProductsQueryParams]>) => {
      const [_, data] = queryKey;

      return fetchInfinityListProducts(params);
    },

    getNextPageParam: (_: IProducts[], pages: IProducts[][]) => {
      return pages.length + 1;
    },
  });

export const useProductsState = (params: IProductsQueryParams) => {
  const [state, setState] = useState<IProductsQueryParams>({
    page_param: 1,
  });

  const handleChangeProductCategory = (
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    const result =
      state.category_id === parseInt(e.currentTarget.id)
        ? -1
        : parseInt(e.currentTarget.id);
    setState({ ...state, category_id: result });
  };
  return {
    state,
    handleChangeProductCategory,
  };
};
