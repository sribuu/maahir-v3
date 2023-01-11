import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { getShipment } from "@/src/storage/reseller/shipment";
import { SingleShipmentContext } from "../contexts/single/SingleShipment.context";
import { ShipmentReactQueryKey } from "../constants";
import { SingleShipmentActionEnum } from "../contexts/single/SingleShipment.types";
import { thousandSeparator } from "@/src/core/utils/formatters";

// Single
export const useSingleGetShipment = () => {
  const { state, dispatch } = useContext(SingleShipmentContext);
  const query = useQuery<IResellerCheckout>(
    [ShipmentReactQueryKey.GetShipment],
    () => {
      return getShipment();
    }
  );

  useEffect(() => {
    if (!query.isFetching && query.data !== undefined) {
      dispatch({
        type: SingleShipmentActionEnum.SetOrders,
        payload: {
          ...state.orders,
          summary: {
            ...state.orders.summary,
            total_price: thousandSeparator(
              query.data.cart.reduce((acc, cartItem) => {
                const totalPriceVariant = cartItem.data.reduce(
                  (accCartData, cartData) => {
                    const variantPrice = cartData.variant_price + accCartData;
                    return variantPrice;
                  },
                  0
                );
                const totalSupplierPrice = acc + totalPriceVariant;
                return totalSupplierPrice;
              }, 0)
            ),
            total_quantity: `${query.data.cart.reduce((acc, cartItem) => {
              const totalPriceVariant = cartItem.data.reduce(
                (accCartData, cartData) => {
                  const variantPrice = cartData.variant_quantity + accCartData;
                  return variantPrice;
                },
                0
              );
              const totalSupplierPrice = acc + totalPriceVariant;
              return totalSupplierPrice;
            }, 0)} Barang`,

            total_payment: thousandSeparator(
              query.data.cart.reduce((acc, cartItem) => {
                const totalPriceVariant = cartItem.data.reduce(
                  (accCartData, cartData) => {
                    const variantPrice = cartData.variant_price + accCartData;
                    return variantPrice;
                  },
                  0
                );
                const totalSupplierPrice = acc + totalPriceVariant;
                return totalSupplierPrice;
              }, 0)
            ),
          },

          detail: query.data.cart.map((item, index) => {
            return {
              name: `Pesanan ${index + 1}`,
              shipping_options: {
                cta: {
                  disabled: true,
                },
                list: [],
              },
              sub_total_price: thousandSeparator(
                item.data.reduce((accData, itemData) => {
                  return itemData.variant_price + accData;
                }, 0)
              ),
              items: item.data.map((itemData) => {
                return {
                  photo: itemData.product_image,
                  category: itemData.category_name,
                  quantity: `${itemData.variant_quantity} Barang`,
                  price: itemData.variant_price,
                  formatted_price: thousandSeparator(itemData.variant_price),
                  name: itemData.product_name,
                  variant: itemData.variant_name,
                };
              }),
            };
          }),
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
