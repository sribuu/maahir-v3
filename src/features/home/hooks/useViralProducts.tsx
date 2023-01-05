import { useContext, useEffect } from "react";
import { IProducts } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";
import { fetchHighlightProducts } from "../services";

import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { fetchAddToCart } from "@/src/core/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResellerHomeContext } from "../contexts/Home.context";
import { ResellerHomeActionEnum } from "../contexts/Home.types";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { IResellerHomeGetProductsItemResponse } from "../models/get__products";

export const useResellerHomeGetViralProducts = () => {
  const { dispatch } = useContext(ResellerHomeContext);

  const query = useQuery<IResellerHomeGetProductsItemResponse>(
    [ResellerHomeReactQueryKey.GetHighlightProducts],
    fetchHighlightProducts,
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
