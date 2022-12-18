import { useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddSupplierProductReactQueryKey,
  EditSupplierProductReactQueryKey,
  ViewSupplierProductReactQueryKey,
} from "../constants";

import { fetchPostUploadSupplierProductImage } from "../services";
import {
  IUploadSupplierProductImageErrorResponse,
  IUploadSupplierProductImageRequest,
  IUploadSupplierProductImageSuccessResponse,
} from "../models";
import { AddSupplierProductContext } from "../contexts/add/AddSupplierProduct.context";
import { AddSupplierProductActionEnum } from "../contexts/add/AddSupplierProduct.types";

// Add
export const useAddSupplierProductUploadProductImage = () => {
  const queryClient = useQueryClient();
  const { state, dispatch } = useContext(AddSupplierProductContext);

  const mutation = useMutation<
    IUploadSupplierProductImageSuccessResponse,
    IUploadSupplierProductImageErrorResponse,
    IUploadSupplierProductImageRequest
  >(
    [AddSupplierProductReactQueryKey.UploadProductImage],
    (data: IUploadSupplierProductImageRequest) => {
      return fetchPostUploadSupplierProductImage(data);
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
      dispatch({
        type: AddSupplierProductActionEnum.SetNotification,
        payload: {
          ...state.notification,
          open: true,
          success: true,
        },
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};

// Edit
export const useEditSupplierProductUploadProductImage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    IUploadSupplierProductImageSuccessResponse,
    IUploadSupplierProductImageErrorResponse,
    IUploadSupplierProductImageRequest
  >(
    [EditSupplierProductReactQueryKey.UploadProductImage],
    (data: IUploadSupplierProductImageRequest) => {
      return fetchPostUploadSupplierProductImage(data);
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

  return mutation;
};
