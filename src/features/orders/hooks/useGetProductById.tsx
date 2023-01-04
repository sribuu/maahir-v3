import { useRouter } from "next/router";
import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { IProducts } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";
import { IGetProductByIdRequest } from "../models";
import { useContext, useEffect } from "react";
import { ResellerOrderBuyNowContext } from "../contexts/buy_now/BuyNow.context";
import { ResellerOrderBuyNowActionEnum } from "../contexts/buy_now/BuyNow.types";
import { thousandSeparator } from "@/src/core/utils/formatters";

// new
export const useBuyNowGetProductById = () => {
  const { state, dispatch } = useContext(ResellerOrderBuyNowContext);
  const router = useRouter();
  const payload = {
    id: parseInt(String(router.query[RouterQueryKey.ProductId])),
  };
  const query = useQuery<IProducts, any>(
    [ReactQueryKey.GetProductById, payload],
    () => {
      return fetchProductById(payload);
    }
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: ResellerOrderBuyNowActionEnum.SetPrice,
        payload: query.data.price,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: ResellerOrderBuyNowActionEnum.SetItem,
        payload: {
          ...state.item,
          name: query.data.name,
          image: query.data.image,
          price: thousandSeparator(query.data.price),
          quantity: 1,
        },
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: ResellerOrderBuyNowActionEnum.SetSummary,
        payload: {
          ...state.summary,
          quantity: 1,
          sub_total_price: thousandSeparator(1 * query.data.price),
          total_price: thousandSeparator(1 * query.data.price),
        },
      });
    }
  }, [query.isFetching]);

  return query;
};

// old
export const useGetProductByIdQuery = (data: IGetProductByIdRequest) =>
  useQuery<IProducts, any, IGetProductByIdRequest>(
    [ReactQueryKey.GetProductById],
    () => fetchProductById(data)
  );
