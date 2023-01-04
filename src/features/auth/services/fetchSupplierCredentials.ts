import { StorageQueryKey } from "@/src/core/lib/constants";
import localforage from "localforage";
import { IToken } from "../models/token";

export const fetchSetSupplierCredentials = async (data: IToken) => {
  return await localforage
    .setItem(StorageQueryKey.SupplierCredentials, data)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};

export const fetchGetSupplierCredentials = async () => {
  return await localforage
    .getItem(StorageQueryKey.SupplierCredentials)
    .then((res: IToken) => res)
    .catch((e) => {
      throw e;
    });
};

export const fetchRemoveSupplierCredentials = async () => {
  return await localforage
    .removeItem(StorageQueryKey.SupplierCredentials)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};
