import { StorageQueryKey } from "@/src/core/lib/constants";
import { PostCreateOrderResponseInterface } from "@/src/models/reseller/api/orders";
import localforage from "localforage";
export const getPayment = async () =>
  await localforage
    .getItem<PostCreateOrderResponseInterface>(StorageQueryKey.Payment)
    .then((res: PostCreateOrderResponseInterface | null) => {
      return res;
    });
