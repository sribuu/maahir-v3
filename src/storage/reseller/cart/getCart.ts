import { StorageQueryKey } from "@/src/core/lib/constants";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import localforage from "localforage";
export const getCart = async () =>
  await localforage
    .getItem<IResellerCart[]>(StorageQueryKey.Cart)
    .then((res: IResellerCart[] | null) => {
      return res === null ? [] : res;
    });
