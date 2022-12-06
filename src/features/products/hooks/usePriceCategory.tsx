import { useQuery } from "@tanstack/react-query";
import { ProductReactQueryKey } from "../constants";
import { IProductGetPriceCategory } from "../models";
import { fetchProductGetPriceCategory } from "../services";

export const usePriceCategoryQuery = () =>
  useQuery<IProductGetPriceCategory[]>(
    [ProductReactQueryKey.GetPriceCategory],
    fetchProductGetPriceCategory
  );

export const usePriceCategoryData = () => usePriceCategoryQuery()?.data;
