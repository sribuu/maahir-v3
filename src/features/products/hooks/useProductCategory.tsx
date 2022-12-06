import { useQuery } from "@tanstack/react-query";
import { ProductReactQueryKey } from "../constants";
import { IProductGetProductCategory } from "../models";
import { fetchProductGetProductCategory } from "../services";

export const useProductCategoryQuery = () =>
  useQuery<IProductGetProductCategory[]>(
    [ProductReactQueryKey.GetProductCategory],
    fetchProductGetProductCategory
  );
