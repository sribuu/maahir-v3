import {
  PostMapsRequestInterface,
  PostMapsResponseInterface,
} from "@/src/models/reseller/api/shipment";
import { fetchGetMaps } from "@/src/services/reseller/shipment";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ShipmentReactQueryKey } from "../constants";
import { SingleShipmentContext } from "../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../contexts/single/SingleShipment.types";

export const useSinglePaymentGetMaps = () => {
  const { state, dispatch } = useContext(SingleShipmentContext);

  const query = useQuery<PostMapsResponseInterface[]>(
    [
      ShipmentReactQueryKey.GetMaps,
      [state.personal_information.address.change_value] as const,
    ],
    () => {
      const payload: PostMapsRequestInterface = {
        address: state.personal_information.address.change_value,
      };
      return fetchGetMaps(payload);
    },
    {
      enabled: state.personal_information.address.change_value.length > 0,
    }
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: SingleShipmentActionEnum.SetAddressList,
        payload: query.data?.map((item) => item.name),
      });
    }
  }, [query.isFetching]);

  return query;
};
