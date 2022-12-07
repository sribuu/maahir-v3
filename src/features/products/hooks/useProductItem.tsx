import { useRouter } from "next/router";
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
  const query = useQuery<IProducts[]>(
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
        sibbling_count: state.pagination.sibbling_count,
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

// PRODUCT
export const useProductGetProductItem = () => {
  const router = useRouter();
  const id = parseInt(String(router.query[RouterQueryKey.ProductId]));
  const { dispatch } = useContext(ProductContext);

  const query = useQuery<IProducts>(
    [ProductReactQueryKey.GetProductById, id],
    () => {
      return fetchProductGetProductById({
        id: id,
      });
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProductActionEnum.SetImage,
        payload: {
          large: query.data.image,
          // TODO: change this when push
          // list: query.data.detail_images,
          list: [
            "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/lemonilo-logo.png",
            "https://shop.maahir.co.id/storage/292/8NhHI5LXtk18wRiXMwuvKvxdKb3mhl-metaU3VhcmFzYSB4IE1hYWhpci0yLnBuZw==-.png",
            "https://shop.maahir.co.id/storage/297/yiMnYvgRbN6WTLYudwPqlOkLQ9KfPo-metaUGFrZXQgS2VtZWphIFZpcmFsLTIucG5n-.png",
          ],
        },
      });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProductActionEnum.SetDetail,
        payload: {
          id: String(query.data.id),
          name: query.data.title,
          category: query.data.category_name,
          description: query.data.description,
          profit: thousandSeparator(query.data.profit_value),
          price: thousandSeparator(query.data.price),
          max_price: thousandSeparator(query.data.retail_price_max),
          min_price: thousandSeparator(query.data.retail_price_min),
          // TODO: change this when be is ready
          variant: {
            list: ["White", "Black", "Blue"],
            selected: "White",
          },
          quantity: 1,
          stock: query.data.stock,
        },
      });
    }
  }, [query.isSuccess]);
  return query;
};
