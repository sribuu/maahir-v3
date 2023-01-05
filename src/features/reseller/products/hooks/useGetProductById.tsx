import { RouterQueryKey } from "@/src/core/lib/constants";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { fetchGetProduct } from "@/src/services/reseller/products/fetchGetProduct";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ProductReactQueryKey } from "../constants";
import { ProductContext } from "../contexts/product/Product.context";
import { ProductActionEnum } from "../contexts/product/Product.types";
import {
  IProductGetProductByIdRequest,
  IProductGetProductByIdResponse,
} from "../models";

// PRODUCT
export const useProductGetProductById = () => {
  const router = useRouter();
  const id = parseInt(String(router.query[RouterQueryKey.ProductId]));
  const { state, dispatch } = useContext(ProductContext);

  const [payload, setPayload] = useState<IProductGetProductByIdRequest>({
    id: id,
  });

  useEffect(() => {
    if (id > 0) {
      setPayload({ ...payload, id: id });
    }
  }, [id]);

  const query = useQuery<IProductGetProductByIdResponse>(
    [ProductReactQueryKey.GetProductById, payload],
    () => {
      return fetchGetProduct(payload);
    },
    {
      refetchInterval: 3000,
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProductActionEnum.SetImage,
        payload: {
          large: query.data.image,
          // TODO: change this when push
          list: query.data.detail_images,
        },
      });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: ProductActionEnum.SetSupplier,
        payload: {
          initial: query.data.supplier.name_initial,
          name: query.data.supplier.name,
          location:
            query.data.supplier.address.administrative_division_level_2_name,
        },
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProductActionEnum.SetDetail,
        payload: {
          id: String(query.data.id),
          name: query.data.name,
          category: query.data.category_name,
          description: query.data.description,
          profit: thousandSeparator(query.data.profit_value),

          max_price: thousandSeparator(query.data.retail_price_max),
          min_price: thousandSeparator(query.data.retail_price_min),
          variant: {
            ...state.detail.variant,
            name: {
              ...state.detail.variant,
              selected: !query.data.variants.length
                ? query.data.variant_name
                : query.data.variants[0].name,
              list: !query.data.variants.length
                ? [query.data.variant_name]
                : query.data.variants.map((item) => item.name),
            },
            stock: {
              ...state.detail.variant.stock,
              selected: !query.data.variants.length
                ? query.data.stock
                : query.data.variants[0].stock,
              list: !query.data.variants.length
                ? [query.data.stock]
                : query.data.variants.map((item) => item.stock),
            },
            price: {
              ...state.detail.variant.price,
              selected: !query.data.variants.length
                ? thousandSeparator(query.data.price)
                : thousandSeparator(query.data.variants[0].price),
              list: !query.data.variants.length
                ? [thousandSeparator(query.data.price)]
                : query.data.variants.map((item) =>
                    thousandSeparator(item.price)
                  ),
            },
          },
          quantity: 1,
        },
      });
    }
  }, [query.isSuccess]);
  return query;
};
