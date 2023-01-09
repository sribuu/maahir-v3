import { StorageQueryKey } from "@/src/core/lib/constants";
import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import { IResellerOrder } from "@/src/core/lib/models/reseller/orders";
import localforage from "localforage";
export const setCheckout = async (data: IResellerCheckout) =>
  await localforage
    .setItem<IResellerCheckout>(StorageQueryKey.Checkout, data)
    .then((res: IResellerCheckout | null) => {
      return res;
    });
