import { IResellerProducts } from "@/src/core/lib/models/reseller";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../../cart/constants";
import { ProductsContext } from "../../products/contexts/products/Products.context";
import { ResellerHomeReactQueryKey } from "../constants";
import { fetchAddViralProductToCart } from "../services";
import { useResellerHomeGetCart } from "./useHomeGetCart";

export const useResellerHomeAddToCart = () => {
  const queryClient = useQueryClient();

  const { data: cartData } = useResellerHomeGetCart();
  const viralProducts: { total: number; products: IResellerProducts[] } =
    queryClient.getQueryData([ResellerHomeReactQueryKey.GetHighlightProducts]);

  const mutation = useMutation<IResellerCart[], any, number>(
    [ResellerHomeReactQueryKey.AddViralProductToCart],
    (data: number) => {
      const test = viralProducts?.products?.filter(
        (item) => item.id === data
      )[0];

      //   transform data
      //   const selectedProduct: IResellerProducts = {
      //     ...test,
      //     supplier: { ...test.supplier, id: 2 },
      //   };

      //   const selectedProduct: IResellerProducts = {
      //     ...test,
      //     id_variant: 900,
      //     //   supplier: { ...test.supplier, id: 2 },
      //   };

      const selectedProduct = test;

      let new_cart: IResellerCart[] = cartData;
      console.log(
        selectedProduct.supplier.id,
        "supplier id",
        selectedProduct.id,
        "product id",
        selectedProduct.id_variant,
        "variant id"
      );

      let condition: string = "";
      if (!new_cart.length) {
        condition = "kondisi 1";
      } else {
        if (
          !new_cart.some(
            (item) => item.supplier.id === selectedProduct.supplier.id
          )
        ) {
          condition = "kondisi 2";
        } else {
          for (let i = 0; i < new_cart.length; i++) {
            if (
              new_cart[i].supplier.data.some(
                (item) =>
                  item.product_id === selectedProduct.id &&
                  item.variant_id === selectedProduct.id_variant
              )
            ) {
              condition = "kondisi 3";
            } else if (
              new_cart[i].supplier.data.some(
                (item) =>
                  item.product_id === selectedProduct.id &&
                  item.variant_id !== selectedProduct.id_variant
              )
            ) {
              condition = "kondisi 4";
            } else {
              condition = "kondisi 5";
            }
          }
        }
      }
      console.log(condition, "ini kondisi berapa");

      //   CASE 1: Cart kosong
      if (condition === "kondisi 1") {
        new_cart = [
          ...new_cart,
          {
            supplier: {
              id: selectedProduct.supplier.id,
              name: selectedProduct.supplier.name,
              name_initial: selectedProduct.supplier.name_initial,
              address: {
                id: selectedProduct.supplier.address.id,
                name: selectedProduct.supplier.address.name,
                country_name: selectedProduct.supplier.address.country_name,
                country_code: selectedProduct.supplier.address.country_code,
                administrative_division_level_1_name:
                  selectedProduct.supplier.address
                    .administrative_division_level_1_name,
                administrative_division_level_1_type:
                  selectedProduct.supplier.address
                    .administrative_division_level_1_type,
                administrative_division_level_2_name:
                  selectedProduct.supplier.address
                    .administrative_division_level_2_name,
                administrative_division_level_2_type:
                  selectedProduct.supplier.address
                    .administrative_division_level_2_type,
                administrative_division_level_3_name:
                  selectedProduct.supplier.address
                    .administrative_division_level_3_name,
                administrative_division_level_3_type:
                  selectedProduct.supplier.address
                    .administrative_division_level_3_type,
                postal_code: selectedProduct.supplier.address.postal_code,
              },
              selected: false,
              data: [
                {
                  category_id: selectedProduct.category_id,
                  category_name: selectedProduct.category_name,
                  description: selectedProduct.description,
                  detail_images: selectedProduct.detail_images,
                  product_id: selectedProduct.id,
                  product_name: selectedProduct.name,
                  image: selectedProduct.image,
                  profit_value: selectedProduct.profit_value,
                  retail_price_max: selectedProduct.retail_price_max,
                  retail_price_min: selectedProduct.retail_price_min,
                  variant_name: selectedProduct.variant_name,
                  variant_id: selectedProduct.id_variant,
                  price: selectedProduct.price,
                  stock: selectedProduct.stock,
                  quantity: 1,
                  note: "",
                  selected: false,
                },
              ],
            },
          },
        ];
      }
      // CASE 2 : cart ada && supplier tidak ada yang sama
      else if (condition === "kondisi 2") {
        new_cart = [
          ...new_cart,
          {
            supplier: {
              id: selectedProduct.supplier.id,
              name: selectedProduct.supplier.name,
              name_initial: selectedProduct.supplier.name_initial,
              address: {
                id: selectedProduct.supplier.address.id,
                name: selectedProduct.supplier.address.name,
                country_name: selectedProduct.supplier.address.country_name,
                country_code: selectedProduct.supplier.address.country_code,
                administrative_division_level_1_name:
                  selectedProduct.supplier.address
                    .administrative_division_level_1_name,
                administrative_division_level_1_type:
                  selectedProduct.supplier.address
                    .administrative_division_level_1_type,
                administrative_division_level_2_name:
                  selectedProduct.supplier.address
                    .administrative_division_level_2_name,
                administrative_division_level_2_type:
                  selectedProduct.supplier.address
                    .administrative_division_level_2_type,
                administrative_division_level_3_name:
                  selectedProduct.supplier.address
                    .administrative_division_level_3_name,
                administrative_division_level_3_type:
                  selectedProduct.supplier.address
                    .administrative_division_level_3_type,
                postal_code: selectedProduct.supplier.address.postal_code,
              },
              selected: false,
              data: [
                {
                  category_id: selectedProduct.category_id,
                  category_name: selectedProduct.category_name,
                  description: selectedProduct.description,
                  detail_images: selectedProduct.detail_images,
                  product_id: selectedProduct.id,
                  product_name: selectedProduct.name,
                  image: selectedProduct.image,
                  profit_value: selectedProduct.profit_value,
                  retail_price_max: selectedProduct.retail_price_max,
                  retail_price_min: selectedProduct.retail_price_min,
                  variant_name: selectedProduct.variant_name,
                  variant_id: selectedProduct.id_variant,
                  price: selectedProduct.price,
                  stock: selectedProduct.stock,
                  quantity: 1,
                  note: "",
                  selected: false,
                },
              ],
            },
          },
        ];
      }
      // CASE 3: cart ada && supplier id sama && product id sama &&  variant sama
      else if (condition === "kondisi 3") {
        new_cart = [
          ...new_cart.filter(
            (item) => item.supplier.id !== selectedProduct.supplier.id
          ),
          ...new_cart
            .filter((item) => item.supplier.id === selectedProduct.supplier.id)
            .map((item) => {
              return {
                ...item,
                supplier: {
                  ...item.supplier,
                  data: item.supplier.data.map((supplierItem) => {
                    return {
                      ...supplierItem,
                      quantity:
                        supplierItem.product_id === selectedProduct.id &&
                        supplierItem.variant_id === selectedProduct.id_variant
                          ? supplierItem.quantity + 1
                          : supplierItem.quantity,
                    };
                  }),
                },
              };
            }),
        ];
      }
      // CASE 4: cart ada && supplier id sama && product id sama &&  variant beda
      else if (condition === "kondisi 4") {
        new_cart = [
          ...new_cart.filter(
            (item) => item.supplier.id !== selectedProduct.supplier.id
          ),
          ...new_cart
            .filter((item) => item.supplier.id === selectedProduct.supplier.id)
            .map((item) => {
              return {
                ...item,
                supplier: {
                  ...item.supplier,
                  data: [
                    ...item.supplier.data,
                    {
                      category_id: selectedProduct.category_id,
                      category_name: selectedProduct.category_name,
                      description: selectedProduct.description,
                      detail_images: selectedProduct.detail_images,
                      product_id: selectedProduct.id,
                      product_name: selectedProduct.name,
                      image: selectedProduct.image,
                      profit_value: selectedProduct.profit_value,
                      retail_price_max: selectedProduct.retail_price_max,
                      retail_price_min: selectedProduct.retail_price_min,
                      variant_name: selectedProduct.variant_name,
                      variant_id: selectedProduct.id_variant,
                      price: selectedProduct.price,
                      stock: selectedProduct.stock,
                      quantity: 1,
                      note: "",
                      selected: false,
                    },
                  ],
                },
              };
            }),
        ];
      }
      // CASE 5: supplier id sama &&  product id tidak sama tidak peduli variant sama atau tidak
      else {
        new_cart = [
          ...new_cart.filter(
            (item) => item.supplier.id !== selectedProduct.supplier.id
          ),
          ...new_cart
            .filter((item) => item.supplier.id === selectedProduct.supplier.id)
            .map((item) => {
              return {
                ...item,
                supplier: {
                  ...item.supplier,
                  data: [
                    ...item.supplier.data,
                    {
                      category_id: selectedProduct.category_id,
                      category_name: selectedProduct.category_name,
                      description: selectedProduct.description,
                      detail_images: selectedProduct.detail_images,
                      product_id: selectedProduct.id,
                      product_name: selectedProduct.name,
                      image: selectedProduct.image,
                      profit_value: selectedProduct.profit_value,
                      retail_price_max: selectedProduct.retail_price_max,
                      retail_price_min: selectedProduct.retail_price_min,
                      variant_name: selectedProduct.variant_name,
                      variant_id: selectedProduct.id_variant,
                      price: selectedProduct.price,
                      quantity: 1,
                      stock: selectedProduct.stock,
                      note: "",
                      selected: false,
                    },
                  ],
                },
              };
            }),
        ];
      }

      const payload = new_cart;

      console.log(cartData, "ini cart awal");
      console.log(payload, "ini cart akhir");

      return fetchAddViralProductToCart(payload);
    },
    {
      onSuccess: (data) => {
        // invalidate get query client inside the function
        queryClient.setQueryData([ResellerHomeReactQueryKey.GetCart], data);
        // invalidate outside the function
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
  return mutation;
};
