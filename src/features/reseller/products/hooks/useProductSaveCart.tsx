import { resellerPriceCategory } from "@/src/data/reseller/static";
import { IProducts } from "@/src/core/lib/models";
import { IResellerProducts } from "@/src/core/lib/models/reseller";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { limitPayload, offsetPayload } from "@/src/core/utils/calculation";
import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey } from "../../cart/constants";
import { ProductReactQueryKey, ProductsReactQueryKey } from "../constants";
import { ProductContext } from "../contexts/product/Product.context";
import { ProductsContext } from "../contexts/products/Products.context";
import {
  IProductGetPriceCategory,
  IProductGetProductCategory,
  IProductGetProductsItemRequest,
} from "../models";
import { fetchStorageSaveCart } from "../services";
import {
  useResellerProductGetCart,
  useResellerProductsGetCart,
} from "./useProductGetCart";

// new
// PRODUCTS
export const useProductsAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { state } = useContext(ProductsContext);
  const { data: cartData } = useResellerProductsGetCart();
  const mutation = useMutation<IResellerCart[], any, number>(
    [ProductsReactQueryKey.AddItemToCart],
    (data: number) => {
      let payloadQueryKey: IProductGetProductsItemRequest = {
        limit: limitPayload(state.pagination.current_page),
        offset: offsetPayload(state.pagination.current_page),
      };

      const categoryList: IProductGetProductCategory[] =
        queryClient.getQueryData([ProductReactQueryKey.GetProductCategory]);
      const priceList: IProductGetPriceCategory[] = resellerPriceCategory;

      if (state.filters.category.selected.length > 0) {
        const categoryId = categoryList.filter(
          (item) => item.option_name === state.filters.category.selected
        )[0].id;
        payloadQueryKey = { ...payloadQueryKey, category_id: categoryId };
      } else {
        payloadQueryKey = {
          ...payloadQueryKey,
          category_id: null,
        };
      }

      if (state.filters.price.selected.length > 0) {
        const priceFilterData = priceList.filter(
          (item) => item.name === state.filters.price.selected
        )[0];

        const minPricePayload = priceFilterData.min;
        const maxPricePayload = priceFilterData.max;
        payloadQueryKey = {
          ...payloadQueryKey,
          min_price: minPricePayload,
          max_price: maxPricePayload,
        };
      } else {
        payloadQueryKey = {
          ...payloadQueryKey,
          min_price: null,
          max_price: null,
        };
      }

      if (state.pagination.current_page > 0) {
        payloadQueryKey = {
          ...payloadQueryKey,
          limit: limitPayload(state.pagination.current_page),
          offset: offsetPayload(state.pagination.current_page),
        };
      }

      if (state.search.submit) {
        payloadQueryKey = {
          ...payloadQueryKey,
          title_like: state.search.value,
        };
      }

      if (payloadQueryKey?.max_price == null) {
        let newPayload = payloadQueryKey;
        delete newPayload?.max_price;
        payloadQueryKey = newPayload;
      }

      if (payloadQueryKey?.min_price == null) {
        let newPayload = payloadQueryKey;
        delete newPayload?.min_price;
        payloadQueryKey = newPayload;
      }

      if (payloadQueryKey?.category_id == null) {
        let newPayload = payloadQueryKey;
        delete newPayload?.category_id;
        payloadQueryKey = newPayload;
      }

      const itemData: { total: number; products: IResellerProducts[] } =
        queryClient.getQueryData(
          [
            ProductsReactQueryKey.GetProductItems,
            [payloadQueryKey, true] as const,
          ],
          {
            exact: false,
          }
        );

      const test = itemData?.products?.filter((item) => item.id === data)[0];
      const selectedProduct = test;

      let new_cart: IResellerCart[] = cartData;

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
                  item.variant_id === selectedProduct.variants[0].id
              )
            ) {
              condition = "kondisi 3";
            } else if (
              new_cart[i].supplier.data.some(
                (item) =>
                  item.product_id === selectedProduct.id &&
                  item.variant_id !== selectedProduct.variants[0].id
              )
            ) {
              condition = "kondisi 4";
            } else {
              condition = "kondisi 5";
            }
          }
        }
      }

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
                  variant_name: selectedProduct.variants[0].name,
                  variant_id: selectedProduct.variants[0].id,
                  price: selectedProduct.variants[0].price,
                  stock: selectedProduct.variants[0].stock,
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
                  variant_name: selectedProduct.variants[0].name,
                  variant_id: selectedProduct.variants[0].id,
                  price: selectedProduct.variants[0].price,
                  stock: selectedProduct.variants[0].stock,
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
                        supplierItem.variant_id ===
                          selectedProduct.variants[0].id
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
                      variant_name: selectedProduct.variants[0].name,
                      variant_id: selectedProduct.variants[0].id,
                      price: selectedProduct.variants[0].price,
                      stock: selectedProduct.variants[0].stock,
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
                      variant_name: selectedProduct.variants[0].name,
                      variant_id: selectedProduct.variants[0].id,
                      price: selectedProduct.variants[0].price,
                      quantity: 1,
                      stock: selectedProduct.variants[0].stock,
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
      return fetchStorageSaveCart(payload);
    },
    {
      onSuccess: (data) => {
        // invalidate get query client inside the function
        queryClient.setQueryData([ProductsReactQueryKey.GetCartItem], data);
        // invalidate outside the function
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
  return mutation;
};

// PRODUCT
export const useProductAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { data: cartData } = useResellerProductGetCart();
  const { state } = useContext(ProductContext);
  return useMutation<IResellerCart[], any>(
    [ProductReactQueryKey.AddItemToCart],
    () => {
      const itemData: IProducts = queryClient.getQueryData(
        [ProductReactQueryKey.GetProductById],
        {
          exact: false,
        }
      );

      const selectedProduct = itemData;

      let new_cart: IResellerCart[] = cartData;
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
                  quantity: state.detail.quantity,
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
                  quantity: state.detail.quantity,
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
                          ? supplierItem.quantity + state.detail.quantity
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
                      quantity: state.detail.quantity,
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
                      quantity: state.detail.quantity,
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
      return fetchStorageSaveCart(payload);
    },
    {
      onSuccess: (data) => {
        // invalidate get query client inside the function
        queryClient.setQueryData([ProductReactQueryKey.GetCartItem], data);
        // invalidate outside the function
        queryClient.invalidateQueries([CartReactQueryKey.GetCartItems]);
      },
    }
  );
};
