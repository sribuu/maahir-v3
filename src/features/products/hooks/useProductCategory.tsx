import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ProductReactQueryKey } from "../constants";
import { ProductsContext } from "../contexts/products/Products.context";
import { ProductsActionEnum } from "../contexts/products/Products.types";
import { IProductGetProductCategory } from "../models";
import { fetchProductGetProductCategory } from "../services";

export const useProductsGetCategoryList = () => {
  const { dispatch } = useContext(ProductsContext);
  const query = useQuery<IProductGetProductCategory[]>(
    [ProductReactQueryKey.GetProductCategory],
    fetchProductGetProductCategory
  );

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProductsActionEnum.SetCategoryFilterList,
        payload: query.data.map((item) => item.option_name),
      });
    }
  }, [query.isSuccess]);
  return query;
};
