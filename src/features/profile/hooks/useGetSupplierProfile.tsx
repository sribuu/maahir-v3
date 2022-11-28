import { ReactQueryKey } from "@/src/core/lib/constants";
import { useQuery } from "@tanstack/react-query";
import {
  IGetSupplierProfileErrorResponse,
  IGetSupplierProfileRequest,
  IGetSupplierProfileSuccessResponse,
} from "../models";
import { fetchGetSupplierProfile } from "../services";

export const useGetSupplierProfileQuery = () =>
  useQuery<
    IGetSupplierProfileSuccessResponse,
    IGetSupplierProfileErrorResponse,
    IGetSupplierProfileRequest
  >([ReactQueryKey.GetSupplierProfile], fetchGetSupplierProfile);
