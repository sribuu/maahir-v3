import { useEffect, useState } from "react";
import { ReactQueryKey } from "@/src/core/lib/constants";
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

// new
export const useViewSupplierProductGetSupplierProductList = () => {
  const { state, dispatch } = useContext(ViewSupplierProductContext);
  const [payload, setPayload] = useState<IGetSupplierProductRequest>({
    limit: 20,
    offset: offsetPayload(state.pagination.current_page),
    is_show: state.tab.active === 0,
    title_like: "",
  });

  useEffect(() => {
    if (!state.search.length) {
      delete payload?.title_like;
    } else {
      setPayload({ ...payload, title_like: state.search });
    }
  }, [state.search]);
  console.log(payload, "ini payload");
  const query = useQuery<
    IGetSupplierProductSuccessResponse,
    IGetSupplierProductErrorResponse
  >([ReactQueryKey.GetSupplierProduct, payload], () => {
    return fetchGetSupplierProducts(payload);
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ViewSupplierProductActionEnum.SetItems,
        payload: query.data.products.map((item) => {
          return {
            image: item.image,
            product_id: String(item.id),
            name: item.title,
            description: item.description,
            stock: item.stock,
            category: item.category_name,
            variant: {
              total: `${20} varian produk`,
              list: [
                {
                  sku: "SK-0123",
                  name: "White",
                  price: thousandSeparator(200000),
                  stock: 3,
                },
                {
                  sku: "SK-0123",
                  name: "White",
                  price: thousandSeparator(200000),
                  stock: 3,
                },
                {
                  sku: "SK-0123",
                  name: "White",
                  price: thousandSeparator(200000),
                  stock: 3,
                },
              ],
            },
          };
        }),
      });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ViewSupplierProductActionEnum.SetPagination,
        payload: {
          ...state.pagination,
          total_page: Math.floor(query.data.total / 20) + 1,
          // current_page: state.pagination.current_page,
        },
      });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isSuccess) {
      const limit = 20;
      dispatch({
        type: ViewSupplierProductActionEnum.SetItemCounts,
        payload: {
          ...state.pagination,
          first_item_index: (state.pagination.current_page - 1) * limit + 1,
          last_item_index:
            (state.pagination.current_page - 1) * limit +
            query.data.total -
            limit * (state.pagination.current_page - 1),
          total: query.data.total,
        },
      });
    }
  }, [query.isSuccess]);

  return query;
};
