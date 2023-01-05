import localforage from "localforage";
import { StorageQueryKey } from "@/src/core/lib/constants";
import { IOrderRequest } from "@/src/features/reseller/orders/models";

export const fetchSaveOrderProduct = async (data: IOrderRequest) => {
  const orderRequestData: IOrderRequest = await localforage
    .getItem(StorageQueryKey.OrderItem)
    .then((res: IOrderRequest | null) => {
      if (res === null) {
        return { ...data };
      } else {
        const filterData = res.orders.filter(
          (item) => item.product_id === data[0].product_id
        );
        const result = !filterData.length
          ? { ...res, orders: [...filterData] }
          : {
              ...res,
              orders: res.orders.map((item) => {
                return {
                  ...item,
                  quantity:
                    item.product_id === data[0].product_id
                      ? filterData[0].quantity
                      : item.quantity,
                };
              }),
            };

        return result;
      }
    });

  return await localforage
    .setItem(StorageQueryKey.OrderItem, orderRequestData)
    .then((res: IOrderRequest) => res);
};

export const fetchSaveOrderItem = async (data: IOrderRequest) => {
  return await localforage
    .setItem(StorageQueryKey.OrderItem, data)
    .then((res: IOrderRequest) => res);
};

export const fetchGetOrderItem = async () =>
  await localforage
    .getItem<IOrderRequest>(StorageQueryKey.OrderItem)
    .then((res: IOrderRequest | null) => {
      return res === null ? {} : res;
    });

export const fetchRemoveOrderItem = async () => {
  return await localforage
    .removeItem(StorageQueryKey.OrderItem)
    .then((_: null) => null);
};
