import localforage from "localforage";
import { StorageQueryKey } from "@/src/core/lib/constants";
import { ResellerCartCreateOrderItemRequest } from "../models";

export const fetchCreateOrderItem = async (
  data: ResellerCartCreateOrderItemRequest
) => {
  const orderRequestData: ResellerCartCreateOrderItemRequest = await localforage
    .getItem(StorageQueryKey.OrderItem)
    .then((res: ResellerCartCreateOrderItemRequest | null) => {
      if (res === null) {
        return { ...data };
      } else {
        const filterData = res.orders.filter(
          (item) => item.id === data[0].product_id
        );
        const result = !filterData.length
          ? { ...res, orders: [...filterData] }
          : {
              ...res,
              orders: res.orders.map((item) => {
                return {
                  ...item,
                  quantity:
                    item.id === data[0].product_id
                      ? filterData[0].stock
                      : item.stock,
                };
              }),
            };

        return result;
      }
    });

  return await localforage
    .setItem(StorageQueryKey.OrderItem, orderRequestData)
    .then((res: ResellerCartCreateOrderItemRequest) => res);
};
