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
    title: state.item.name.value,

    // price: numberFormatters.indonesianMoneyToNumber(state.item)
    // retail_price_min: number;
    // retail_price_max: number;
    // profit_value: number;
    category_id: categoryData.filter(
      (item) => item.option_name === state.item.category.value
    )[0].id,

    // stock:state.
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
    is_show: state.item.availability.value === "Tersedia" ? true : false,
  });

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
      uploadProductImage({
        product_id: mutation.data.id,
        position: 1,
        file_content: "",
        file_format: "png",
      });
    }
  }, [mutation.isSuccess]);

  // TODO: sukses sebanyak image yang di upload masukin ke upload images harusnya baru di routing
  useEffect(() => {
    if (isSuccessUploadProductImage) {
      router.push(RouterPathName.SupplierProductManagement);
    }
  }, [isSuccessUploadProductImage]);

  return mutation;
};
