import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";
import { ResellerHomeContext } from "../contexts/Home.context";
import { ResellerHomeActionEnum } from "../contexts/Home.types";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { IResellerHomeGetProductsItemResponse } from "../models/get__products";
import { fetchGetProducts } from "@/src/services/reseller/products";

export const useResellerHomeGetViralProducts = () => {
  const { dispatch } = useContext(ResellerHomeContext);

  const query = useQuery<IResellerHomeGetProductsItemResponse>(
    [ResellerHomeReactQueryKey.GetHighlightProducts],
    () => {
      const payload = { is_priority: true, limit: 3, offset: 0 };
      return fetchGetProducts(payload);
    },
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      const payload = query.data.products.map((item) => {
        return {
          id: String(item.id),
          name: item.name,
          image: item.image,
          profit: thousandSeparator(item.profit_value),
          price: thousandSeparator(item.variants[0].price),
          haveVariant: item.variants.length > 1,
        };
      });

      dispatch({
        type: ResellerHomeActionEnum.SetViralProducts,
        payload: payload,
      });
    }
  }, [query.isSuccess]);

  return query;
};
