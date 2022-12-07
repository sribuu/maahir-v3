import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useAuthSupplierLogin } from "../../hooks/useLogin";
import LoginFormAuth from "../login_form/LoginForm.auth";
import UnregisterEmailModal from "../unregister_email_modal/UnregisterEmailModal.auth";
import InvalidPasswordModalAuth from "../invalid_password_modal/InvalidPasswordModal.auth";
import { ErrorMessage, RouterPathName } from "@/src/core/lib/constants";
import { useSupplierLoginSaveToken } from "../../hooks/useSupplierCredentials";
import moment from "moment";
import { SupplierLoginContext } from "../../contexts/login/Login.context";

export interface ILoginFormValidationAuthProps {}

export default function LoginFormValidationAuth(
  props: ILoginFormValidationAuthProps
) {
  const { state } = useContext(SupplierLoginContext);
  // const {
  //   mutate: mutateLogin,
  //   error: errorLogin,
  //   data: loginData,
  //   isSuccess: isSuccessLogin,
  // } = useAuthSupplierLogin();
  // const onSubmit = (data: { email: string; password: string }) => {
  //   mutateLogin(data);
  // };
  // const {
  //   mutate: mutateSupplierCredentialQuery,
  //   isSuccess: isSuccessSaveSupplierCredentials,
  // } = useMutateSupplierCredentialQuery();

  // useEffect(() => {
  //   if (isSuccessLogin) {
  //     mutateSupplierCredentialQuery({
  //       token: loginData.token,
  //       refresh_token: loginData.refresh_token,
  //       expires_in: parseInt(loginData.expires_in),
  //       expired_date: moment()
  //         .add(parseInt(loginData.expires_in), "seconds")
  //         .format("YYYY-MM-DD hh:mm:ss"),
  //     });
  //   }
  // }, [isSuccessLogin]);

  // const router = useRouter();

  // useEffect(() => {
  //   if (isSuccessSaveSupplierCredentials) {
  //     router.push(RouterPathName.HomeSupplier);
  //   }
  // }, [isSuccessSaveSupplierCredentials]);

  return (
    <>
      <LoginFormAuth />

      <UnregisterEmailModal open={state.error.unregister_email} />
      <InvalidPasswordModalAuth open={state.error.invalid_password} />
    </>
  );
}
