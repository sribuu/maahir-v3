import { useEffect, useState } from "react";
import { offsetPayload } from "@/src/core/utils/calculation";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ViewSupplierProductContext } from "../contexts/view/ViewSupplierProduct.context";
import {
  IGetSupplierProductRequest,
  IGetSupplierProductSuccessResponse,
  IGetSupplierProductErrorResponse,
} from "../models";
import { fetchGetSupplierProducts } from "../services";
import { ViewSupplierProductActionEnum } from "../contexts/view/ViewSupplierProduct.types";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { ViewSupplierProductReactQueryKey } from "../constants";

export const useViewSupplierProductGetSupplierProductList = () => {
  const { state, dispatch } = useContext(ViewSupplierProductContext);
  const [payload, setPayload] = useState<IGetSupplierProductRequest>({
    limit: 20,
    offset: offsetPayload(state.pagination.current_page),
    is_show: state.tab.active === 0,
  });

  useEffect(() => {
    if (!state.search.length) {
      delete payload?.title_like;
    } else {
      setPayload({ ...payload, title_like: state.search });
    }
  }, [state.search]);

  const query = useQuery<
    IGetSupplierProductSuccessResponse,
    IGetSupplierProductErrorResponse
  >([ViewSupplierProductReactQueryKey.GetSupplierProductList, payload], () => {
    return fetchGetSupplierProducts(payload);
  });

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: ViewSupplierProductActionEnum.SetItems,
        payload: query?.data?.products.map((item) => {
          return {
            image: item.image,
            product_id: String(item.id),
            name: item.title,
            description: item.description,
            stock: item.stock,
            category: item.category_name,
            variant: {
              total: `${
                !item.variants.length ? 1 : item.variants.length
              } varian produk`,
              list: !item.variants.length
                ? [
                    {
                      sku: item.sku,
                      name: item.variant_name,
                      price: thousandSeparator(item.price),
                      stock: item.stock,
                    },
                  ]
                : item.variants.map((variant_item) => {
                    return {
                      sku: variant_item.sku,
                      name: variant_item.name,
                      price: thousandSeparator(variant_item.price),
                      stock: variant_item.stock,
                    };
                  }),
            },
          };
        }),
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: ViewSupplierProductActionEnum.SetPagination,
        payload: {
          ...state.pagination,
          total_page: Math.floor(query?.data?.total / 20) + 1,
        },
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const limit = 20;
      dispatch({
        type: ViewSupplierProductActionEnum.SetItemCounts,
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
