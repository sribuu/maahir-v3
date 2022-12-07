import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductReactQueryKey } from "../constants";
import { IProductGetPriceCategory } from "../models";
import { fetchProductGetPriceCategory } from "../services";
import { ProductsContext } from "../contexts/products/Products.context";
import { ProductsActionEnum } from "../contexts/products/Products.types";

export const usePriceCategoryQuery = () => {
  const { dispatch } = useContext(ProductsContext);
  const query = useQuery<IProductGetPriceCategory[]>(
    [ProductReactQueryKey.GetPriceCategory],
    fetchProductGetPriceCategory
  );

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProductsActionEnum.SetPriceFilterList,
        payload: query.data.map((item) => item.name),
      });
    }
  }, [query.isSuccess]);
  return query;
};
