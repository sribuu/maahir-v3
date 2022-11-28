import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "@/src/features/auth/services";
import { ReactQueryKey } from "@/src/core/lib/constants";
import {
  ILoginErrorResponse,
  ILoginRequest,
  ILoginSuccessResponse,
} from "../models";

export const useMutateLoginQuery = () =>
  useMutation<ILoginSuccessResponse, ILoginErrorResponse, ILoginRequest>(
    [ReactQueryKey.PostLogin],
    (data: ILoginRequest) => fetchLogin(data)
  );
