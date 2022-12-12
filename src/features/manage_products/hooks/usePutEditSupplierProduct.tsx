import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EditSupplierProductReactQueryKey,
  ViewSupplierProductReactQueryKey,
} from "../constants";

import { numberFormatters } from "@/src/core/utils/formatters";
import { IOptions } from "@/src/core/lib/models";
import { useEditSupplierProductUploadProductImage } from "./usePostUploadSupplierProductImage";
import { RouterPathName } from "@/src/core/lib/constants";
import {
  IPutSupplierProductErrorResponse,
  IPutSupplierProductRequest,
  IPutSupplierProductSuccessResponse,
} from "../models/put_supplier_product";
import { fetchPutUpdateSupplierProduct } from "../services/fetchPutUpdateSupplierProduct";
import { EditSupplierProductContext } from "../contexts/edit/EditSupplierProduct.context";

// Update
export const useEditSupplierProductUpdateSupplierProduct = () => {
  const router = useRouter();
  const { state } = useContext(EditSupplierProductContext);
  const { mutate: uploadProductImage, isSuccess: isSuccessUploadProductImage } =
    useEditSupplierProductUploadProductImage();
  const queryClient = useQueryClient();
  const categoryData: IOptions[] = queryClient.getQueryData([
    EditSupplierProductReactQueryKey.GetProductCategory,
  ]);

  const mutation = useMutation<
    IPutSupplierProductSuccessResponse,
    IPutSupplierProductErrorResponse
  >(
    [EditSupplierProductReactQueryKey.EditProductItem],
    () => {
      const payload: IPutSupplierProductRequest = {
        id: state.product_id,
        title: state.item.name.value,
        category_id: categoryData.filter(
          (item) => item.option_name === state.item.category.value
        )[0].id,
        weight: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.weight.value)
        ),
        length: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.length.value)
        ),
        width: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.width.value)
        ),
        height: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.height.value)
        ),
        description: state.item.description.value,
        is_show: state.item.availability.value === "Tampilkan" ? true : false,
        variants: state.variant.map((item) => {
          return {
            sku: item.sku.value,
            name: item.variant.value,
            stock: parseInt(item.stock.value),
            price: parseInt(item.price.value),
            is_show: item.action.value === "show",
          };
        }),
      };
      return fetchPutUpdateSupplierProduct(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          [ViewSupplierProductReactQueryKey.GetSupplierProductList],
          { exact: false }
        );
      },
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      const reformattedList = [
        state.images.list[state.images.cover_image_position],
        ...state.images.list.filter(
          (_, index) => index !== state.images.cover_image_position
        ),
      ].map((item) => {
        return {
          base64: item.base64.slice(item.base64.indexOf(",") + 1),
          file_format: item.file_format.slice(
            item.file_format.indexOf("/") + 1
          ),
        };
      });
      for (let i = 0; i < reformattedList.length; i++) {
        uploadProductImage({
          product_id: mutation.data.id,
          position: i + 1,
          file_content: reformattedList[i].base64,
          file_format: reformattedList[i].file_format,
        });
      }
    }
  }, [mutation.isSuccess]);

  // TODO: sukses sebanyak image yang di upload masukin ke upload images harusnya baru di routing
  // useEffect(() => {
  //   if (isSuccessUploadProductImage) {
  //     router.push(RouterPathName.SupplierProductManagement);
  //   }
  // }, [isSuccessUploadProductImage]);

  return mutation;
};
