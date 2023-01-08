import { useContext, useEffect } from "react";
import { GetPaymentResponseInterface } from "@/src/models/reseller/api/payment";
import { fetchGetPayment } from "@/src/services/reseller/payment";
import { useQuery } from "@tanstack/react-query";
import { ShipmentReactQueryKey } from "../constants";
import { SingleShipmentContext } from "../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../contexts/single/SingleShipment.types";

export const useSinglePaymentGetPayment = () => {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const query = useQuery<GetPaymentResponseInterface>(
    [ShipmentReactQueryKey.GetPayment],
    () => {
      return fetchGetPayment();
    }
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: SingleShipmentActionEnum.SetPaymentList,
        payload: query?.data?.items?.map((item) => {
          return {
            id: String(item.id),
            logo: item.pic,
            name: item.provider_name,
            selected: false,
            fee: item.fee_amount,
          };
        }),
      });
    }
  }, [query.isFetching]);

  return query;
};
