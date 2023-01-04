import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ViewSupplierProductReactQueryKey } from "../constants";
import {
  IChangeSupplierProductShowRequest,
  IChangeSupplierProductShowSuccessResponse,
  IChangeSupplierProductshowErrorResponse,
} from "../models";
import { fetchPostChangeSupplierProductShow } from "../services";

export const useViewSupplierProductChangeViewProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IChangeSupplierProductShowSuccessResponse,
    IChangeSupplierProductshowErrorResponse,
    IChangeSupplierProductShowRequest
  >(
    [ViewSupplierProductReactQueryKey.ChangeProductView],
    (data: IChangeSupplierProductShowRequest) =>
      fetchPostChangeSupplierProductShow(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          [ViewSupplierProductReactQueryKey.GetSupplierProductList],
          { exact: false }
        );
      },
    }
  );
};
