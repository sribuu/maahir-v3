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

export const useResellerHomeGetViralProducts = () => {
  const { dispatch } = useContext(ResellerHomeContext);

  const query = useQuery<IProducts[]>(
    [ResellerHomeReactQueryKey.GetHighlightProducts],
    fetchHighlightProducts,
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      const payload = query.data.map((item) => {
        return {
          id: String(item.id),
          name: item.title,
          image: item.image,
          profit: thousandSeparator(item.profit_value),
          price: thousandSeparator(item.price),
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

export const useResellerHomeAddViralProductToCart = () => {
  const queryClient = useQueryClient();
  const viralProducts: IProducts[] = queryClient.getQueryData([
    ResellerHomeReactQueryKey.GetHighlightProducts,
  ]);

  const mutation = useMutation<ICart[], any, number>(
    [ResellerHomeReactQueryKey.SaveHighlightProductToCart],
    (data: number) => {
      const filterData = viralProducts.filter((item) => item.id === data)[0];
      const payload = {
        ...filterData,
        amount: 1,
        note: "",
        variant: "",
      };
      return fetchAddToCart(payload);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([ReactQueryKey.AddCart], data);
        queryClient.invalidateQueries([ReactQueryKey.GetCart]);
      },
    }
  );
  return mutation;
};
