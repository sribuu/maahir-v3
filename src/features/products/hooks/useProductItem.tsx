import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IProducts } from "@/src/core/lib/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";
import {
  IProductGetPriceCategory,
  IProductGetProductCategory,
  IProductGetProductsItemRequest,
  IProductGetProductsItemResponse,
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
import { fetchProductGetProductById } from "../services/fetchGetProductById";
import { RouterQueryKey } from "@/src/core/lib/constants";
import { ProductContext } from "../contexts/product/Product.context";
import { ProductActionEnum } from "../contexts/product/Product.types";

// PRODUCTS
export const useProductsGetProductItems = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const queryClient = useQueryClient();

  // Payload Transformation
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

  // Query
  const query = useQuery<IProductGetProductsItemResponse>(
    [ProductsReactQueryKey.GetProductItems, payload],
    () => {
      return fetchProductGetProducstItem(payload);
    },
    {
      retry: false,
    }
  );

  // Data Transformation
  useEffect(() => {
    if (!query.isFetching) {
      const payload: IProductItems[] = query.data.products.map((item) => {
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
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const payload: IProductsPagination = {
        ...state.pagination,
        total_page: Math.floor(query?.data?.total / 20) + 1,
      };
      dispatch({
        type: ProductsActionEnum.SetProductsPagination,
        payload: payload,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const limit = 16;

      dispatch({
        type: ProductsActionEnum.SetItemCounts,
        payload: {
          ...state.pagination,
          first_item_index: (state.pagination.current_page - 1) * limit + 1,
          last_item_index:
            query.data.total - limit * state.pagination.current_page > 0
              ? limit
              : query.data.total - limit * state.pagination.current_page,
          total: query?.data?.total,
        },
      });
    }
  }, [query.isFetching]);
  return query;
};
