import {
  IResellerCheckout,
  IResellerProducts,
} from "@/src/core/lib/models/reseller";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ResellerHomeReactQueryKey } from "../constants";
import { fetchAddViralProductToCheckout } from "../services";

export const useResellerHomeAddToCheckout = () => {
  const queryClient = useQueryClient();

  const viralProducts: { total: number; products: IResellerProducts[] } =
    queryClient.getQueryData([ResellerHomeReactQueryKey.GetHighlightProducts]);

  const mutation = useMutation<IResellerCheckout, any, number>(
    [ResellerHomeReactQueryKey.AddViralProductToCart],
    (data: number) => {
      const selectedProduct = viralProducts?.products?.filter(
        (item) => item.id === data
      )[0];

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
        cart: [
          {
            supplier_id: -1,
            // additional information supplier
            supplier_name: selectedProduct.supplier.name,
            supplier_initial: selectedProduct.supplier.name_initial,
            supplier_location:
              selectedProduct.supplier.address
                .administrative_division_level_2_name,
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
            data: [
              {
                product_id: selectedProduct.id,
                // additional information product
                product_image: selectedProduct.image,
                category_name: selectedProduct.category_name,
                product_name: selectedProduct.name,
                profit_value: selectedProduct.profit_value,
                retail_price_max: selectedProduct.retail_price_max,
                retail_price_min: selectedProduct.retail_price_min,

                variants: [
                  {
                    variant_id: selectedProduct.variants[0].id,
                    note: "",
                    quantity: 1,
                    // additional information variant
                    price: selectedProduct.variants[0].price,
                    stock: selectedProduct.variants[0].stock,
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
      };

      return fetchAddViralProductToCheckout(payload);
    },
    {
      onSuccess: (data) => {
        // invalidate get query client inside the function
        // queryClient.setQueryData([ResellerHomeReactQueryKey.GetCart], data);
        // invalidate outside the function
        // queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
  return mutation;
};
