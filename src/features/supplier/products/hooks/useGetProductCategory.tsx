import { ErrorMessage, RouterPathName } from "@/src/core/lib/constants";
import { IOptions } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import {
  AddSupplierProductReactQueryKey,
  EditSupplierProductReactQueryKey,
} from "../constants";
import { AddSupplierProductContext } from "../contexts/add/AddSupplierProduct.context";
import { AddSupplierProductActionEnum } from "../contexts/add/AddSupplierProduct.types";
import { EditSupplierProductContext } from "../contexts/edit/EditSupplierProduct.context";
import { EditSupplierProductActionEnum } from "../contexts/edit/EditSupplierProduct.types";
import {
  fetchAddSupplierProductGetProductCategory,
  fetchEditSupplierProductGetProductCategory,
} from "../services/fetchGetProductCategory";

// Create
export const useAddSupplierProductsGetCategoryList = () => {
  const router = useRouter();
  const { dispatch } = useContext(AddSupplierProductContext);
  const query = useQuery<IOptions[], { error_code: string; message: string }>(
    [AddSupplierProductReactQueryKey.GetProductCategory],
    fetchAddSupplierProductGetProductCategory
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: AddSupplierProductActionEnum.SetProductCategoryList,
        payload: query.data.map((item) => item.option_name),
      });
    }
  }, [query.isFetching]);

  return query;
};

// Edit
export const useEditSupplierProductsGetCategoryList = () => {
  const router = useRouter();
  const { dispatch } = useContext(EditSupplierProductContext);
  const query = useQuery<IOptions[], { error_code: string; message: string }>(
    [EditSupplierProductReactQueryKey.GetProductCategory],
    fetchEditSupplierProductGetProductCategory
  );

  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: EditSupplierProductActionEnum.SetProductCategoryList,
        payload: query.data.map((item) => item.option_name),
      });
    }
  }, [query.isFetching]);

  // useEffect(() => {
  //   if (
  //     !query.isFetching &&
  //     query.error.error_code === ErrorMessage.Unauthorized
  //   ) {
  //     router.push(RouterPathName.Login);
  //   }
  // }, [query.isFetching]);

  return query;
};
