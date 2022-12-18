import { AuthEventNames } from "../constants/event_names";
type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const trackSupplierSubmitLogin = (properties: any) => {
  window?.dataLayer.push({
    event: "event",
    eventProps: {
      category: "reseller",
      action: "click",
      label: AuthEventNames.ClikLogin,
      value: properties,
    },
  });
};
