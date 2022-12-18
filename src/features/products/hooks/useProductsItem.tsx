import { useContext, useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

const detectMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

// PRODUCTS
export const useProductsGetProductItems = () => {
  const [isNotMobile, setIsNotMobile] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    const mobile = detectMobile();
    setIsNotMobile(!mobile);
  }, []);
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
      setPayload({
        ...payload,
        category_id: null,
      });
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
      setPayload({
        ...payload,
        min_price: null,
        max_price: null,
      });
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

  // cleaner
  useEffect(() => {
    if (payload?.max_price == null) {
      let newPayload = payload;
      delete newPayload?.max_price;
      setPayload(newPayload);
    }

    if (payload?.min_price == null) {
      let newPayload = payload;
      delete newPayload?.min_price;
      setPayload(newPayload);
    }
  }, [payload?.max_price, payload?.min_price]);

  useEffect(() => {
    if (payload?.category_id == null) {
      let newPayload = payload;
      delete newPayload?.category_id;
      setPayload(newPayload);
    }
  }, [payload?.category_id]);

  // Query
  const query = useQuery<IProductGetProductsItemResponse>(
    [ProductsReactQueryKey.GetProductItems, payload, isNotMobile],
    () => {
      console.log(isNotMobile, "ini apa");
      return fetchProductGetProducstItem(payload);
    },
    {
      enabled: isNotMobile === true,
      retry: false,
    }
  );

  // Data Transformation
  useEffect(() => {
    if (!query.isFetching) {
      const itemTransformation: IProductItems[] = query.data?.products?.map(
        (item) => {
          return {
            id: String(item?.id),
            name: item?.title,
            image: item?.image,
            profit: thousandSeparator(item?.profit_value),
            price: thousandSeparator(item?.price),
          };
        }
      );
      const payload =
        itemTransformation === undefined ? [] : itemTransformation;
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
            query?.data?.total - limit * state.pagination.current_page > 0
              ? limit
              : query?.data?.total - limit * state.pagination.current_page,
          total: query?.data?.total,
        },
      });
    }
  }, [query.isFetching]);
  return query;
};

export const useProductsInfinityListGetProductItems = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mobile = detectMobile();
    setIsMobile(mobile);
  }, []);

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
      setPayload({
        ...payload,
        category_id: null,
      });
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
      setPayload({
        ...payload,
        min_price: null,
        max_price: null,
      });
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

  // cleaner
  useEffect(() => {
    if (payload?.max_price == null) {
      let newPayload = payload;
      delete newPayload?.max_price;
      setPayload(newPayload);
    }

    if (payload?.min_price == null) {
      let newPayload = payload;
      delete newPayload?.min_price;
      setPayload(newPayload);
    }
  }, [payload?.max_price, payload?.min_price]);

  useEffect(() => {
    if (payload?.category_id == null) {
      let newPayload = payload;
      delete newPayload?.category_id;
      setPayload(newPayload);
    }
  }, [payload?.category_id]);

  // Query
  const query = useInfiniteQuery<IProductGetProductsItemResponse>(
    [ProductsReactQueryKey.GetProductItems, payload, isMobile],
    ({ pageParam = 0 }) => {
      let newPayload: IProductGetProductsItemRequest = {
        ...payload,
        offset: pageParam,
      };
      return fetchProductGetProducstItem(newPayload);
    },
    {
      enabled: isMobile === true,
      retry: false,
      getNextPageParam: (_, pageParams) => {
        return pageParams.length * 16;
      },
    }
  );

  // Data Transformation
  useEffect(() => {
    if (!query.isFetching) {
      let payload: IProductItems[] = [];
      for (let i = 0; i < query?.data?.pages?.length; i++) {
        for (let j = 0; j < query?.data?.pages[i]?.products?.length; j++) {
          payload = [
            ...payload,
            {
              id: String(query?.data?.pages[i]?.products[j]?.id),
              name: query?.data?.pages[i]?.products[j]?.title,
              image: query?.data?.pages[i]?.products[j]?.image,
              profit: thousandSeparator(
                query?.data?.pages[i]?.products[j]?.profit_value
              ),
              price: thousandSeparator(
                query?.data?.pages[i]?.products[j]?.price
              ),
            },
          ];
        }
      }

      dispatch({
        type: ProductsActionEnum.SetProductItems,
        payload: payload,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const payload: IProductsPagination = {
        ...state.pagination,
        total_page: Math.floor(query?.data?.pages[0].total / 20) + 1,
      };
      dispatch({
        type: ProductsActionEnum.SetProductsPagination,
        payload: payload,
      });
    }
  }, [query.isFetching]);

  // useEffect(() => {
  //   if (!query.isFetching) {
  //     const limit = 16;

  //     // dispatch({
  //     //   type: ProductsActionEnum.SetItemCounts,
  //     //   payload: {
  //     //     ...state.pagination,
  //     //     first_item_index: (state.pagination.current_page - 1) * limit + 1,
  //     //     last_item_index:
  //     //       query.data.pages.total - limit * state.pagination.current_page > 0
  //     //         ? limit
  //     //         : query.data.total - limit * state.pagination.current_page,
  //     //     total: query?.data?.total,
  //     //   },
  //     // });
  //   }
  // }, [query.isFetching]);
  return query;
};
