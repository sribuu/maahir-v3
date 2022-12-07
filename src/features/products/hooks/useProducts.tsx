import { useContext, useEffect, useState } from "react";
import { IProducts } from "@/src/core/lib/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";
import {
  IProductGetPriceCategory,
  IProductGetProductCategory,
  IProductGetProductsItemRequest,
} from "../models";
import { fetchProductGetProducstItem } from "../services/fetchGetProductItems";
import { ProductsContext } from "../contexts/products/Products.context";
import {
  IProductItems,
  IProductsPagination,
  ProductsActionEnum,
} from "../contexts/products/Products.types";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { limitPayload, offsetPayload } from "@/src/core/utils/calculation";

export const useProductsGetProductItems = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const queryClient = useQueryClient();

  const categoryList: IProductGetProductCategory[] = queryClient.getQueryData([
    ProductReactQueryKey.GetProductCategory,
  ]);
  const priceList: IProductGetPriceCategory[] = queryClient.getQueryData([
    ProductReactQueryKey.GetPriceCategory,
  ]);

  const [payload, setPayload] = useState<IProductGetProductsItemRequest>({
    limit: limitPayload(state.pagination.current_page),
    offset: offsetPayload(state.pagination.current_page),
  });

  useEffect(() => {
    if (state.filters.category.selected.length > 0) {
      const categoryId = categoryList.filter(
        (item) => item.option_name === state.filters.category.selected
      )[0].id;
      setPayload({ ...payload, category_id: categoryId });
    } else {
      delete payload?.category_id;
    }
  }, [state.filters.category.selected]);

  useEffect(() => {
    if (state.filters.price.selected.length > 0) {
      const priceFilterData = priceList.filter(
        (item) => item.name === state.filters.price.selected
      )[0];

      const minPricePayload = priceFilterData.min;
      const maxPricePayload = priceFilterData.max;
      setPayload({
        ...payload,
        min_price: minPricePayload,
        max_price: maxPricePayload,
      });
    } else {
      delete payload?.min_price;
      delete payload?.max_price;
    }
  }, [state.filters.price.selected]);

  useEffect(() => {
    if (state.pagination.current_page > 0) {
      setPayload({
        ...payload,
        limit: limitPayload(state.pagination.current_page),
        offset: offsetPayload(state.pagination.current_page),
      });
    }
  }, [state.pagination.current_page]);

  const query = useQuery<IProducts[]>(
    [ProductsReactQueryKey.GetProductItems, payload],
    () => {
      return fetchProductGetProducstItem(payload);
    },
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      const payload: IProductItems[] = query.data.map((item) => {
        return {
          id: String(item.id),
          name: item.title,
          image: item.image,
          profit: thousandSeparator(item.profit_value),
          price: thousandSeparator(item.price),
        };
      });
      dispatch({ type: ProductsActionEnum.SetProductItems, payload: payload });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isSuccess) {
      const payload: IProductsPagination = {
        sibbling_count: 2,
        // TODO: replace ketika be update
        total_page: state.pagination.total_page,
        current_page: state.pagination.current_page,
      };
      dispatch({
        type: ProductsActionEnum.SetProductsPagination,
        payload: payload,
      });
    }
  }, [query.isSuccess]);
  return query;
};
