import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { SingleShipmentContext } from "../contexts/single/SingleShipment.context";
import { ShipmentReactQueryKey } from "../constants";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { fetchGetPricingList } from "@/src/services/reseller/shipment";
import {
  GetPricingListRequestInterface,
  GetPricingListResponseInterface,
} from "@/src/models/reseller/api/shipment";
import { PostMapsResponseInterface } from "@/src/models/reseller/api/shipment";
import { SingleShipmentActionEnum } from "../contexts/single/SingleShipment.types";

// Single
export const useSingleGetPricingList = () => {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const queryClient = useQueryClient();
  const shipmentItems: IResellerCheckout = queryClient.getQueryData([
    ShipmentReactQueryKey.GetShipment,
  ]);

  const addressList: PostMapsResponseInterface[] = queryClient.getQueryData([
    ShipmentReactQueryKey.GetMaps,
    [state.personal_information.address.change_value] as const,
  ]);

  const mutation = useMutation<GetPricingListResponseInterface[]>(
    [ShipmentReactQueryKey.GetPricingList],
    () => {
      const payload: GetPricingListRequestInterface = {
        orders: shipmentItems.cart.map((shipmentItem) => {
          return {
            supplier_id: shipmentItem.supplier_id,
            products: shipmentItem.data.map((shipmentData) => {
              return {
                id: shipmentData.product_id,
                quantity: shipmentData.variant_quantity,
                variant_id: shipmentData.variant_id,
              };
            }),
          };
        }),
        destination_area_id:
          addressList[
            parseInt(state.personal_information.address.selected_index)
          ].id,
      };

      return fetchGetPricingList(payload);
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: SingleShipmentActionEnum.SetOrders,
        payload: {
          ...state.orders,
          // detail:
          detail: state.orders.detail.map((item, index) => {
            return {
              ...item,
              shipping_options: {
                cta: {
                  disabled: false,
                },
                list: mutation.data[index].data.map((shipping) => {
                  return {
                    courier_code: shipping.courier_code,
                    courier_service_code: shipping.courier_service_code,
                    name: `${shipping.courier_service_name} - ${shipping.courier_name}`,
                    eta: shipping.eta,
                    price: shipping.price,
                    formatted_price: thousandSeparator(shipping.price),
                    selected: false,
                  };
                }),
              },
            };
          }),
        },
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};
