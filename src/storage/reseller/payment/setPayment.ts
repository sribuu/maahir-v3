import { StorageQueryKey } from "@/src/core/lib/constants";
import { PostCreateOrderResponseInterface } from "@/src/models/reseller/api/orders";
import localforage from "localforage";
export const setPayment = async (data: PostCreateOrderResponseInterface) =>
  await localforage
    .setItem<PostCreateOrderResponseInterface>(StorageQueryKey.Payment, data)
    .then((res: PostCreateOrderResponseInterface | null) => {
      return res;
    });
