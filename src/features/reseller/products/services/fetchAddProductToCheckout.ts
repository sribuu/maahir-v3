import { StorageQueryKey } from "@/src/core/lib/constants";
import { IResellerOrder } from "@/src/core/lib/models/reseller/orders";
import localforage from "localforage";
export const fetchAddProductToCheckout = async (data: IResellerOrder) =>
  await localforage
    .setItem<IResellerOrder>(StorageQueryKey.Checkout, data)
    .then((res: IResellerOrder | null) => {
      return res;
    });
