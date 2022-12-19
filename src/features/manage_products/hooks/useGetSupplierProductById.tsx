import { RouterQueryKey } from "@/src/core/lib/constants";
import { numberFormatters } from "@/src/core/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { EditSupplierProductReactQueryKey } from "../constants";
import { EditSupplierProductContext } from "../contexts/edit/EditSupplierProduct.context";
import { EditSupplierProductActionEnum } from "../contexts/edit/EditSupplierProduct.types";
import {
  IGetSupplierProductByIdSuccessResponse,
  IGetSupplierProductByIdRequest,
} from "../models";

import { fetchGetSupplierProductById } from "../services/fetchGetSupplierProductById";

// Edit
export const useEditSupplierProductsGetSupplierProductById = () => {
  const router = useRouter();
  const id = parseInt(String(router.query[RouterQueryKey.ProductId]));
  const payload: IGetSupplierProductByIdRequest = {
    id: id,
  };
  const { state, dispatch } = useContext(EditSupplierProductContext);
  const query = useQuery<IGetSupplierProductByIdSuccessResponse>(
    [EditSupplierProductReactQueryKey.GetProductById, payload],
    () => {
      return fetchGetSupplierProductById(payload);
    }
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: EditSupplierProductActionEnum.SetProductId,
        payload: query.data.id,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: EditSupplierProductActionEnum.SetName,
        payload: query.data.title,
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetCategory,
        payload: query.data.category_name,
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetLength,
        payload: numberFormatters.thousandSeparator(String(query.data.length)),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetWidth,
        payload: numberFormatters.thousandSeparator(String(query.data.width)),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetHeight,
        payload: numberFormatters.thousandSeparator(String(query.data.height)),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetWeight,
        payload: numberFormatters.thousandSeparator(String(query.data.weight)),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetDescription,
        payload: query.data.description,
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetAvailability,
        payload: query.data.is_show ? "Tampilkan" : "Sembunyikan",
      });
      //  TODO: images and detail images
      dispatch({
        type: EditSupplierProductActionEnum.SetImageList,
        payload: query.data.detail_images.map((item) => {
          return {
            base64: item,
            file_format: item.split(".")[1],
          };
        }),
      });

      //  TODO: variants
      dispatch({
        type: EditSupplierProductActionEnum.SetVariant,
        payload: !query.data.variants.length
          ? [
              {
                id: query.data.id_variant,
                sku: {
                  placeholder: "SKU",
                  value: query.data.sku,
                },
                variant: {
                  placeholder: "Varian",
                  value: query.data.variant_name,
                },
                price: {
                  placeholder: "Harga",
                  value: numberFormatters.thousandSeparator(
                    String(query.data.price)
                  ),
                },
                stock: {
                  placeholder: "Stock",
                  value: numberFormatters.thousandSeparator(
                    String(query.data.stock)
                  ),
                },
                action: {
                  placeholder: "",
                  value: "show",
                },
              },
            ]
          : query.data.variants.map((item) => {
              return {
                ...state.variant,
                id: item.id,
                sku: {
                  placeholder: "SKU",
                  value: item.sku,
                },
                variant: {
                  placeholder: "Variant",
                  value: item.name,
                },
                price: {
                  placeholder: "Price",
                  value: numberFormatters.thousandSeparator(String(item.price)),
                },
                stock: {
                  placeholder: "Stock",
                  value: numberFormatters.thousandSeparator(String(item.stock)),
                },
                action: {
                  placeholder: "Price",
                  value: item.is_show ? "show" : "hide",
                },
              };
            }),
      });
    }
  }, [query.isFetching]);

  return query;
};
