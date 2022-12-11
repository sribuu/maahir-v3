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

// Add
export const useAddSupplierProductUploadProductImage = () => {
  const queryClient = useQueryClient();

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
