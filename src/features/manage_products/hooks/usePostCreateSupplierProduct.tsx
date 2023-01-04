import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddSupplierProductReactQueryKey,
  ViewSupplierProductReactQueryKey,
} from "../constants";

import {
  ICreateSupplierProductErrorResponse,
  ICreateSupplierProductRequest,
  ICreateSupplierProductSuccessResponse,
} from "../models/create_supplier_product";
import { fetchPostCreateSupplierProduct } from "../services/fetchPostCreateSupplierProduct";
import { AddSupplierProductContext } from "../contexts/add/AddSupplierProduct.context";
import { numberFormatters } from "@/src/core/utils/formatters";
import { IOptions } from "@/src/core/lib/models";

import { useAddSupplierProductUploadProductImage } from "./usePostUploadSupplierProductImage";
import { RouterPathName } from "@/src/core/lib/constants";

// Add
export const useAddSupplierProductCreateSupplierProduct = () => {
  const router = useRouter();
  const { state } = useContext(AddSupplierProductContext);
  const { mutate: uploadProductImage, isSuccess: isSuccessUploadProductImage } =
    useAddSupplierProductUploadProductImage();
  const queryClient = useQueryClient();
  const categoryData: IOptions[] = queryClient.getQueryData([
    AddSupplierProductReactQueryKey.GetProductCategory,
  ]);
  const [payload, setPayload] = useState<ICreateSupplierProductRequest>({
    title: "",
    category_id: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    description: "",
    is_show: true,
    variants: [],
  });

  useEffect(() => {
    if (state.item.name.value.length > 0) {
      setPayload({ ...payload, title: state.item.name.value });
    }
  }, [state.item.name.value]);

  useEffect(() => {
    if (state.item.category.value.length > 0) {
      setPayload({
        ...payload,
        category_id: categoryData.filter(
          (item) => item.option_name === state.item.category.value
        )[0].id,
      });
    }
  }, [state.item.category.value]);

  useEffect(() => {
    if (state.item.weight.value.length > 0) {
      setPayload({
        ...payload,
        weight: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.weight.value)
        ),
      });
    }
  }, [state.item.weight.value]);

  useEffect(() => {
    if (state.item.width.value.length > 0) {
      setPayload({
        ...payload,
        width: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.width.value)
        ),
      });
    }
  }, [state.item.width.value]);

  useEffect(() => {
    if (state.item.length.value.length > 0) {
      setPayload({
        ...payload,
        length: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.length.value)
        ),
      });
    }
  }, [state.item.length.value]);

  useEffect(() => {
    if (state.item.height.value.length > 0) {
      setPayload({
        ...payload,

        height: parseInt(
          numberFormatters.thousandSeparatorToNumber(state.item.height.value)
        ),
      });
    }
  }, [state.item.height.value]);

  useEffect(() => {
    if (state.item.description.value.length > 0) {
      setPayload({
        ...payload,
        description: state.item.description.value,
      });
    }
  }, [state.item.description.value]);

  useEffect(() => {
    if (state.item.availability.value.length > 0) {
      setPayload({
        ...payload,
        is_show: state.item.availability.value === "Tampilkan" ? true : false,
      });
    }
  }, [state.item.availability.value]);

  useEffect(() => {
    if (state.variant.length > 0) {
      setPayload({
        ...payload,
        variants: state.variant.map((item) => {
          return {
            sku: item.sku.value,
            name: item.variant.value,
            stock: parseInt(item.stock.value),
            price: parseInt(item.price.value),
            is_show: item.action.value === "show",
          };
        }),
      });
    }
  }, [state.variant]);

  const mutation = useMutation<
    ICreateSupplierProductSuccessResponse,
    ICreateSupplierProductErrorResponse
  >(
    [AddSupplierProductReactQueryKey.CreateProductItem, payload],
    () => {
      return fetchPostCreateSupplierProduct(payload);
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
