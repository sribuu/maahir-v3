import React, { FormEvent, useContext } from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import { SupplierLoginContext } from "../../contexts/login/Login.context";
import { SupplierLoginActionEnum } from "../../contexts/login/Login.types";
import { useSupplierLogin } from "../../hooks/useSupplierLogin";
export interface ILoginFormAuthProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

export default function LoginFormAuth(props: ILoginFormAuthProps) {
  const { state, dispatch } = useContext(SupplierLoginContext);
  const { mutate: supplierLogin } = useSupplierLogin();
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SupplierLoginActionEnum.ChangeEmail,
      payload: e.currentTarget.value,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SupplierLoginActionEnum.ChangePassword,
      payload: e.currentTarget.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    supplierLogin();
  };

  return (
    <form
      className={clsx(
        "grid grid-cols-1 gap-y-[1.5rem]",
        "items-start content-start",
        "w-full"
      )}
      onSubmit={onSubmit}
    >
      <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]", "w-full")}>
        <TextfieldComponent
          name="firstName"
          label={"Email"}
          type={"text"}
          placeholder={"Masukkan Email"}
          onChange={handleChangeEmail}
          invalid={state.form.email.error.status.toString()}
          helpertext={state.form.email.error.message}
        />
      </div>

      <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]", "w-full")}>
        <TextfieldComponent
          label={"Kata Sandi"}
          placeholder={"Masukkan Kata Sandi"}
          type={"password"}
          onChange={handleChangePassword}
          invalid={state.form.password.error.status.toString()}
          helpertext={state.form.password.error.message}
        />
      </div>

      <input
        className={clsx(
          "p-[0.875rem] w-full rounded-[0.75rem]",
          "bg-ocean-boat-blue",
          "text-white text-[1rem] font-bold",
          "cursor-pointer"
        )}
        type={"submit"}
        value={"Login"}
      />
    </form>
  );
}
