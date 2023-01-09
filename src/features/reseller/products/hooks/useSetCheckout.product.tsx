import { useContext } from "react";
import { useRouter } from "next/router";
import {
  IResellerCheckout,
  IResellerProducts,
} from "@/src/core/lib/models/reseller";
import { setCheckout } from "@/src/storage/reseller/checkout";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import { IProductGetProductByIdResponse } from "../models";
import { ProductContext } from "../contexts/product/Product.context";

// Products
export const useProductsSetCheckout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const products: { total: number; products: IResellerProducts[] } =
    queryClient.getQueryData([ProductsReactQueryKey.GetProductItems]);

  const mutation = useMutation<IResellerCheckout, any, number>(
    [ProductsReactQueryKey.AddProductToCheckout],
    (data: number) => {
      const selectedProduct = products?.products?.filter(
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
            supplier_id: selectedProduct.supplier.id,
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
                variant_id: selectedProduct.variants[0].id,
                variant_note: "",
                variant_quantity: 1,
                variant_name: selectedProduct.variants[0].name,
                // additional information variant
                variant_price: selectedProduct.variants[0].price,
                variant_stock: selectedProduct.variants[0].stock,
              },
            ],
          },
        ],
      };

      return setCheckout(payload);
    },
    {
      onSuccess: (data) => {
        router.push(RouterPathName.Buy);
      },
    }
  );

  return mutation;
};

// Product
export const useProductSetCheckout = () => {
  const { state } = useContext(ProductContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<IResellerCheckout>(
    [ProductsReactQueryKey.AddProductToCheckout],
    () => {
      const selectedProduct: IProductGetProductByIdResponse =
        queryClient.getQueryData([
          ProductReactQueryKey.GetProductById,
          { id: parseInt(String(router.query[RouterQueryKey.ProductId])) },
        ]);

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
            supplier_id: selectedProduct.supplier.id,
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
                variant_id:
                  selectedProduct.variants[state.detail.variant.selected_index]
                    .id,
                variant_note: "",
                variant_quantity: 1,
                variant_name:
                  selectedProduct.variants[state.detail.variant.selected_index]
                    .name,
                // additional information variant
                variant_price:
                  selectedProduct.variants[state.detail.variant.selected_index]
                    .price,
                variant_stock:
                  selectedProduct.variants[state.detail.variant.selected_index]
                    .stock,
              },
            ],
          },
        ],
      };

      return setCheckout(payload);
    },
    {
      onSuccess: (data) => {
        router.push(RouterPathName.Buy);
      },
    }
  );

  return mutation;
};
