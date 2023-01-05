import { useContext, useEffect } from "react";
import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { useQuery } from "@tanstack/react-query";
import { ResellerCheckoutReactQueryKey } from "../constants";
import { ResellerOrderBuyNowContext } from "../contexts/buy_now/BuyNow.context";
import { fetchGetCheckoutItem } from "../service/fetchGetCheckoutItem";
import { ResellerOrderBuyNowActionEnum } from "../contexts/buy_now/BuyNow.types";

// checkout
export const useResellerCheckoutGetCheckoutItems = () => {
  const { state, dispatch } = useContext(ResellerOrderBuyNowContext);
  const query = useQuery<IResellerCheckout>(
    [ResellerCheckoutReactQueryKey.GetCheckoutItems],
    () => {
      return fetchGetCheckoutItem();
    }
  );

  return query;
};
