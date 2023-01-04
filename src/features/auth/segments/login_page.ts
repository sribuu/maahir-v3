import { AuthEventNames } from "../constants/event_names";

export const trackSupplierSubmitLogin = (properties: any) => {
  window?.analytics?.track(AuthEventNames.ClikLogin, properties);
};

export const trackUnregisterEmailSupplierLogin = (properties: any) => {
  window?.analytics?.track(AuthEventNames.UnregisterEmailLogin, properties);
};

export const trackInvalidPasswordSupplierLogin = (properties: any) => {
  window?.analytics?.track(AuthEventNames.InvalidPasswordLogin, properties);
};

export const trackLogoutSupplier = (properties: any) => {
  window?.analytics?.track(AuthEventNames.Logout, properties);
};
