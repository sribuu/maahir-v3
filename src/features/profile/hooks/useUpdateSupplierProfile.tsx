import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "@/src/features/auth/services";
import { ReactQueryKey } from "@/src/core/lib/constants";
import {
  IUpdateSupplierProfileRequest,
  IUpdateSupplierProfileSuccessResponse,
  IUpdateSupplierProfileErrorResponse,
} from "../models";
import { fetchUpdateSupplierProfile } from "../services";

export const useMutateLoginQuery = () =>
  useMutation<
    IUpdateSupplierProfileSuccessResponse,
    IUpdateSupplierProfileErrorResponse,
    IUpdateSupplierProfileRequest
  >(
    [ReactQueryKey.PutUpdateSupplierProfile],
    (data: IUpdateSupplierProfileRequest) => fetchUpdateSupplierProfile(data)
  );
