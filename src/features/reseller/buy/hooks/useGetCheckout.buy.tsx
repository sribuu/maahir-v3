import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { BuyDirectlyContext } from "../contexts/BuyDirectly.context";
import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { getCheckout } from "@/src/storage/reseller/checkout";
import { BuyReactQueryKey } from "../constants";
import { BuyDirectlyActionEnum } from "../contexts/BuyDirectly.types";
import { thousandSeparator } from "@/src/core/utils/formatters";

// Directly
export const useDirectlyGetCheckout = () => {
  const { dispatch } = useContext(BuyDirectlyContext);
  const query = useQuery<IResellerCheckout | null>(
    [BuyReactQueryKey.GetCheckout],
    () => {
      return getCheckout();
    }
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: BuyDirectlyActionEnum.SetItems,
        payload: query.data?.cart
          .map((item) => {
            return item.data.map((itemData) => {
              return {
                category_name: itemData.category_name,
                name: itemData.product_name,
                price: thousandSeparator(itemData.variant_price),
                image: itemData.product_image,
                quantity: itemData.variant_quantity,
                product_id: itemData.product_id,
                variant_id: itemData.variant_id,
                variant_name: itemData.variant_name,
                note: itemData.variant_note,
              };
            });
          })
          .flat(1)[0],
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: BuyDirectlyActionEnum.SetCalculator,
        payload: query.data?.cart
          .map((item) => {
            return item.data.map((itemData) => {
              return {
                total_price: thousandSeparator(itemData.variant_price),
                total_payment: thousandSeparator(itemData.variant_price),
                total_quantity: `${itemData.variant_quantity} Barang`,
              };
            });
          })
          .flat(1)[0],
      });
    }
  }, [query.isFetching]);

  console.log(query.data, "ini checkout");
  return query;
};
