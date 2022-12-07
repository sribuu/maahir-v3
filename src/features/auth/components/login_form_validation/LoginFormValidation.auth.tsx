import { useContext } from "react";
import LoginFormAuth from "../login_form/LoginForm.auth";
import UnregisterEmailModal from "../unregister_email_modal/UnregisterEmailModal.auth";
import InvalidPasswordModalAuth from "../invalid_password_modal/InvalidPasswordModal.auth";
import { SupplierLoginContext } from "../../contexts/login/Login.context";

export interface ILoginFormValidationAuthProps {}

export default function LoginFormValidationAuth(
  props: ILoginFormValidationAuthProps
) {
  const { state } = useContext(SupplierLoginContext);

  return (
    <>
      <LoginFormAuth />

      <UnregisterEmailModal open={state.error.unregister_email} />
      <InvalidPasswordModalAuth open={state.error.invalid_password} />
    </>
  );
}
