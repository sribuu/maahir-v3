import { ReactQueryKey } from "@/src/core/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    [ReactQueryKey.PostChangeSupplierProductShow],
    (data: IChangeSupplierProductShowRequest) =>
      fetchPostChangeSupplierProductShow(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ReactQueryKey.GetSupplierProduct]);
      },
    }
  );
};
