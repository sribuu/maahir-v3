import { useRouter } from "next/router";
import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { MyCartReactQueryKey } from "../constants";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { useContext } from "react";
import { ResellerMyCartContext } from "../contexts/my_cart/MyCart.context";
import { setShipment } from "@/src/storage/reseller/shipment";
import { RouterPathName } from "@/src/core/lib/constants";

export const useMyCartSetShipment = () => {
  const { state } = useContext(ResellerMyCartContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const cart: IResellerCart[] = queryClient.getQueryData([
    MyCartReactQueryKey.GetCartItems,
  ]);

  const mutation = useMutation<IResellerCheckout>(
    [MyCartReactQueryKey.SetCheckout],
    () => {
      const filteredState = state.cart.items
        .filter((item) => item.selected)
        .map((item) => item.variant_id);

      console.log(filteredState, "filter state");

      const filteredCart = cart
        .map((item) => {
          return {
            ...item,
            supplier: {
              ...item.supplier,
              data: item.supplier.data.filter((itemData) =>
                filteredState.includes(String(itemData.variant_id))
              ),
            },
          };
        })
        .filter((item) => item.supplier.data.length !== 0);
      console.log(filteredCart, "filter cart");

      const payload: IResellerCheckout = {
        payment_method_id: -1,
        reseller: {
          name: "",
          email: "",
          phone_number: "",
          address: {
            id: "",
            name: "",
            country_name: "",
            country_code: "",
            administrative_division_level_1_name: "",
            administrative_division_level_1_type: "",
            administrative_division_level_2_name: "",
            administrative_division_level_2_type: "",
            administrative_division_level_3_name: "",
            administrative_division_level_3_type: "",
            postal_code: "",
          },
        },
        dropshipper: {
          name: "",
          phone_number: "",
        },
        cart: filteredCart.map((item) => {
          return {
            supplier_id: item.supplier.id,
            // additional information supplier
            supplier_name: item.supplier.name,
            supplier_initial: item.supplier.name_initial,
            supplier_location:
              item.supplier.address.administrative_division_level_2_name,
            shipping_detail: {
              available_for_cash_on_delivery: false,
              available_for_proof_of_delivery: false,
              available_for_instant_waybill_id: false,
              available_for_insurance: false,
              company: "",
              courier_name: "",
              courier_code: "",
              courier_service_name: "",
              courier_service_code: "",
              description: "",
              duration: "",
              shipment_duration_range: "",
              shipment_duration_unit: "",
              service_type: "",
              shipping_type: "",
              price: -1,
              type: "",
            },

            data: item.supplier.data.map((itemData) => {
              return {
                product_id: itemData.product_id,
                // additional information product
                product_image: itemData.image,
                category_name: itemData.category_name,
                product_name: itemData.product_name,
                profit_value: itemData.profit_value,
                retail_price_max: itemData.retail_price_max,
                retail_price_min: itemData.retail_price_min,
                variant_id: itemData.variant_id,
                variant_note: "",
                variant_quantity: 1,
                variant_name: itemData.variant_name,
                // additional information variant
                variant_price: itemData.price,
                variant_stock: itemData.stock,
              };
            }),
          };
        }),
      };

      return setShipment(payload);
    },
    {
      onSuccess: (data) => {
        router.push(RouterPathName.Shipment);
      },
    }
  );
  return mutation;
};
