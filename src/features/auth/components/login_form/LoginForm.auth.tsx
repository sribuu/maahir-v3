import React, { FormEvent, useState } from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
export interface ILoginFormAuthProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

export type ILoginFormState = {
  email: {
    invalid: boolean;
    value: string;
    message: string;
  };
  password: {
    invalid: boolean;
    value: string;
    message: string;
  };
};
export default function LoginFormAuth(props: ILoginFormAuthProps) {
  const [state, setState] = useState<ILoginFormState>({
    email: {
      invalid: false,
      value: "",
      message: "",
    },
    password: {
      invalid: false,
      value: "",
      message: "",
    },
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      email: { ...state.email, value: e.currentTarget.value },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: { ...state.password, value: e.currentTarget.value },
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit({
        email: state.email.value,
        password: state.password.value,
      });
    }
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
          invalid={state.email.invalid.toString()}
          helpertext={state.email.message}
        />
      </div>

      <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]", "w-full")}>
        <TextfieldComponent
          label={"Kata Sandi"}
          placeholder={"Masukkan Kata Sandi"}
          type={"password"}
          onChange={handleChangePassword}
          invalid={state.password.invalid.toString()}
          helpertext={state.password.message}
        />
      </div>

      <input
        className={clsx(
          "p-[0.875rem] w-full rounded-[0.75rem]",
          "bg-ocean-boat-blue",
          "text-white text-[1rem] font-bold"
        )}
        type={"submit"}
        value={"Login"}
      />
    </form>
  );
}
