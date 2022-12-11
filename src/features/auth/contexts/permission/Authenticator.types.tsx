type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface InitialStateType {
  is_authenticated: boolean;
}

// State Collection Types consist of:

export enum AuthenticatorActionEnum {
  SetPermission = "SetPermission",
}

// Action Collection Types
export type AuthenticatorActions = AuthenticatorIsAuthenticatedActions;

// Action Collection Types consist of:
// Viral Products
type AuthenticatorIsAuthenticatedPayload = {
  [AuthenticatorActionEnum.SetPermission]: boolean;
};

export type AuthenticatorIsAuthenticatedActions =
  ActionMap<AuthenticatorIsAuthenticatedPayload>[keyof ActionMap<AuthenticatorIsAuthenticatedPayload>];
