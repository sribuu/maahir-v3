import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchGetOrderItem,
  fetchRemoveOrderItem,
  fetchSaveOrderItem,
} from "../service";
import { IOrderRequest, IOrderResponse } from "../models";
import { ReactQueryKey } from "@/src/core/lib/constants";

export const useMutateOrderItem = () =>
  useMutation<IOrderRequest, IOrderRequest, IOrderRequest>(
    [ReactQueryKey.SaveOrderItem],
    (data: IOrderRequest) => fetchSaveOrderItem(data)
  );

export const useOrderItemQuery = () =>
  useQuery<IOrderRequest>([ReactQueryKey.GetOrderItem], fetchGetOrderItem);

export const useFilterOrderItem = (id: number) =>
  useOrderItemQuery().data?.orders?.filter((item) => item?.product_id === id);

export const useFilterOrderItemQuantity = (id: number) =>
  useOrderItemQuery().data?.orders?.filter((item) => item.product_id === id)[0]
    ?.quantity;

export const useDeleteOrderItemQuery = () =>
  useQuery<IOrderRequest[]>(
    [ReactQueryKey.DeleteOrderItem],
    fetchRemoveOrderItem
  );
