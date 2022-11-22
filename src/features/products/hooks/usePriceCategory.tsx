import { fetchMaahirPriceCategory } from "@/src/core/lib/api";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IPriceCategory } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";

export const usePriceCategoryQuery = () =>
  useQuery<IPriceCategory[]>(
    [ReactQueryKey.GetPriceCategory],
    fetchMaahirPriceCategory
  );

export const usePriceCategoryData = () => usePriceCategoryQuery().data;
