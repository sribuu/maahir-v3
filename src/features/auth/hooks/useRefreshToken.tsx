import { useMutation } from "@tanstack/react-query";
import { fetchRefreshToken } from "@/src/features/auth/services";
import { ReactQueryKey } from "@/src/core/lib/constants";
import {
  IRefreshTokenErrorResponse,
  IRefreshTokenRequest,
  IRefreshTokenSuccessResponse,
} from "../models";

export const useMutateRefreshTokenQuery = () =>
  useMutation<
    IRefreshTokenSuccessResponse,
    IRefreshTokenErrorResponse,
    IRefreshTokenRequest
  >([ReactQueryKey.GetRefreshToken], (data: IRefreshTokenRequest) =>
    fetchRefreshToken(data)
  );
