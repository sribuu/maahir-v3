import { StorageQueryKey } from "@/src/core/lib/constants";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import localforage from "localforage";
export const setCart = async (data: IResellerCart[]) =>
  await localforage
    .setItem<IResellerCart[]>(StorageQueryKey.Cart, data)
    .then((res: IResellerCart[] | null) => {
      return res === null ? [] : res;
    });
