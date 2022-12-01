import localforage from "localforage";
import { StorageQueryKey } from "../constants";
import { ICart } from "../models";

export const fetchAddToCart = async (data: ICart) => {
  const cartData: ICart[] = await localforage
    .getItem(StorageQueryKey.ItemCart)
    .then((res: ICart[] | null) => {
      if (res === null) {
        return [data];
      } else {
        const filterData = res.filter((item) => item.id === data.id);
        const result = !filterData.length
          ? [...res, data]
          : res.map((item) => {
              return { ...item, amount: item.amount + data.amount };
            });
        return result;
      }
    });

  return await localforage
    .setItem(StorageQueryKey.ItemCart, cartData)
    .then((res: ICart[]) => res);
};

export const fetchCartItem = async () =>
  await localforage
    .getItem<ICart[]>(StorageQueryKey.ItemCart)
    .then((res: ICart[] | null) => {
      return res === null ? [] : res;
    });

export const fetchRemoveAllItemInCart = async () => {
  return await localforage
    .removeItem(StorageQueryKey.ItemCart)
    .then((_: null) => null);
};

export const fetchRemoveItemCartById = async () => {
  return await localforage
    .getItem<ICart[] | null>(StorageQueryKey.ItemCart)
    .then((res: ICart[] | null) => res);
};

export const fetchUpdateNoteItemCartById = async (product: ICart) =>
  await localforage
    .getItem<ICart[]>(StorageQueryKey.ItemCart)
    .then((res: ICart[] | null) => {
      if (res === null) {
        return;
      }
      // find index of item to be updated
      const cartItem = res.findIndex((item) => item.id === product.id);
      // update cart notes
      res[cartItem].note = product.note;

      localforage.setItem(StorageQueryKey.ItemCart, res);
    });
