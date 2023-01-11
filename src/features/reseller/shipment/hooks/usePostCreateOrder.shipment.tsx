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
  PostMapsRequestInterface,
} from "@/src/models/reseller/api/shipment";
import { PostMapsResponseInterface } from "@/src/models/reseller/api/shipment";
import { SingleShipmentActionEnum } from "../contexts/single/SingleShipment.types";
import { fetchPostCreateOrders } from "@/src/services/reseller/orders";
import { PostCreateOrderRequestInterface } from "@/src/models/reseller/api/orders";
import { GetPaymentResponseInterface } from "@/src/models/reseller/api/payment";
import {
  invalidNameValidation,
  invalidPhonenumberValidation,
} from "@/src/core/utils/validation";
// Single
export const useSinglePostCreateOrder = () => {
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
    [ShipmentReactQueryKey.PostCreateOrder],
    () => {
      const payload: PostCreateOrderRequestInterface = {
        payment_method_id: parseInt(
          state.orders.payment.list.filter((item) => item.selected)[0].id
        ),
        reseller: {
          name: state.personal_information.name.save_value,
          email: state.personal_information.email.save_value,
          phone_number: state.personal_information.mobile.save_value,
          address: {
            id: addressList[
              parseInt(state.personal_information.address.selected_index)
            ].id,
            name: addressList[
              parseInt(state.personal_information.address.selected_index)
            ].name,
            country_name:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].country_name,
            country_code:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].country_code,
            administrative_division_level_1_name:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].administrative_division_level_1_name,
            administrative_division_level_1_type:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].administrative_division_level_1_type,
            administrative_division_level_2_name:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].administrative_division_level_2_name,
            administrative_division_level_2_type:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].administrative_division_level_2_type,
            administrative_division_level_3_name:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].administrative_division_level_3_name,
            administrative_division_level_3_type:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].administrative_division_level_3_name,

            postal_code:
              addressList[
                parseInt(state.personal_information.address.selected_index)
              ].postal_code,
          },
          detail_address: state.personal_information.detail_address.save_value,
        },
        // TODO: review this logic
        dropshipper: !state.dropshipper.is_dropshipper
          ? null
          : state.dropshipper.is_dropshipper &&
            invalidNameValidation(state.dropshipper.name.value)
          ? null
          : state.dropshipper.is_dropshipper &&
            invalidPhonenumberValidation(state.dropshipper.mobile.value)
          ? null
          : {
              name: state.dropshipper.name.value,
              phone_number: state.dropshipper.mobile.value,
            },
        cart: shipmentItems.cart.map((shipmentItem, shipmentItemIndex) => {
          return {
            supplier_id: shipmentItem.supplier_id,
            shipping_detail: {
              courier_code: state.orders.detail[
                shipmentItemIndex
              ].shipping_options.list.filter(
                (optionItem) => optionItem.selected
              )[0].courier_code,
              courier_service_code: state.orders.detail[
                shipmentItemIndex
              ].shipping_options.list.filter(
                (optionItem) => optionItem.selected
              )[0].courier_service_code,
            },
            data: shipmentItem.data.map((shipmentData) => {
              return {
                product_id: shipmentData.product_id,
                variant_id: shipmentData.variant_id,
                note: shipmentData.variant_note,
                quantity: shipmentData.variant_quantity,
              };
            }),
          };
        }),
      };

      return fetchPostCreateOrders(payload);
    }
  );

  return mutation;
};
