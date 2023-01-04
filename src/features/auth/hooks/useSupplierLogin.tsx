import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "@/src/features/auth/services";
import {
  ILoginErrorResponse,
  ILoginRequest,
  ILoginSuccessResponse,
} from "../models";
import { SupplierLoginContext } from "../contexts/login/Login.context";
import { SupplierLoginReactQueryKey } from "../constants";
import { useSupplierLoginSaveToken } from "./useSupplierLoginSaveToken";
import { ErrorMessage } from "@/src/core/lib/constants";
import { SupplierLoginActionEnum } from "../contexts/login/Login.types";

export const useSupplierLogin = () => {
  const { state, dispatch } = useContext(SupplierLoginContext);
  const { mutate: saveSupplierToken } = useSupplierLoginSaveToken();
  const mutation = useMutation<ILoginSuccessResponse, ILoginErrorResponse>(
    [SupplierLoginReactQueryKey.Login, state],
    () => {
      const payload: ILoginRequest = {
        email: state.form.email.value,
        password: state.form.password.value,
      };
      return fetchLogin(payload);
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      saveSupplierToken(mutation.data);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (
      mutation.isError &&
      mutation.error.error_code === ErrorMessage.EmailNotRegister
    ) {
      dispatch({ type: SupplierLoginActionEnum.SetUnregisterEmailError });
    } else if (
      mutation.isError &&
      mutation.error.error_code === ErrorMessage.InvalidPassword
    ) {
      dispatch({ type: SupplierLoginActionEnum.SetInvalidPasswordError });
    }
  }, [mutation.isError, mutation.error]);

  return mutation;
};
