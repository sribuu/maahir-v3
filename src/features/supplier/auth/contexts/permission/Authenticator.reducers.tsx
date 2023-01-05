import {
  AuthenticatorActionEnum,
  AuthenticatorActions,
} from "./Authenticator.types";

// ViralProducts
export const authenticatorIsAuthenticatedReducer = (
  state: boolean,
  action: AuthenticatorActions
) => {
  switch (action.type) {
    case AuthenticatorActionEnum.SetPermission:
      return action.payload;
    default:
      return state;
  }
};
