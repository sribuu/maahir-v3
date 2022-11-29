import { useMutation } from "@tanstack/react-query";
import { ReactQueryKey } from "@/src/core/lib/constants";
import {
  IUpdateSupplierProfileRequest,
  IUpdateSupplierProfileSuccessResponse,
  IUpdateSupplierProfileErrorResponse,
} from "../models";
import { fetchUpdateSupplierProfile } from "../services";

export const useUpdateSupplierProfileQuery = () =>
  useMutation<
    IUpdateSupplierProfileSuccessResponse,
    IUpdateSupplierProfileErrorResponse,
    IUpdateSupplierProfileRequest
  >(
    [ReactQueryKey.PutUpdateSupplierProfile],
    (data: IUpdateSupplierProfileRequest) => fetchUpdateSupplierProfile(data)
  );
