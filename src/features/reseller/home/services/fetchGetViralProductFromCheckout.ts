import { StorageQueryKey } from "@/src/core/lib/constants";
import { IResellerCheckout } from "@/src/core/lib/models/reseller";
import localforage from "localforage";
export const fetchGetViralProductFromCheckout = async () =>
  await localforage
    .getItem<IResellerCheckout>(StorageQueryKey.Checkout)
    .then((res: IResellerCheckout | null) => {
      return res;
    });
