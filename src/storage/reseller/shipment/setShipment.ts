import { StorageQueryKey } from "@/src/core/lib/constants";
import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import localforage from "localforage";
export const setShipment = async (data: IResellerCheckout) =>
  await localforage
    .setItem<IResellerCheckout>(StorageQueryKey.Shipment, data)
    .then((res: IResellerCheckout | null) => {
      return res;
    });
