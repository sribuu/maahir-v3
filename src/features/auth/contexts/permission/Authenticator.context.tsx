import React, { createContext, useReducer, Dispatch } from "react";
import { AuthenticatorActions, InitialStateType } from "./Authenticator.types";
import { authenticatorIsAuthenticatedReducer } from "./Authenticator.reducers";

const initialState: InitialStateType = {
  is_authenticated: false,
};

const AuthenticatorContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AuthenticatorActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { is_authenticated }: InitialStateType,
  action: AuthenticatorActions
) => ({
  is_authenticated: authenticatorIsAuthenticatedReducer(
    is_authenticated,
    action
  ),
});

const AuthenticatorProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AuthenticatorContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthenticatorContext.Provider>
  );
};

export { AuthenticatorProvider, AuthenticatorContext };
