import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchGetOrderItem,
  fetchRemoveOrderItem,
  fetchSaveOrderProduct,
  fetchSaveOrderItem,
} from "../service";
import { IOrderRequest, IOrderResponse } from "../models";
import { ReactQueryKey } from "@/src/core/lib/constants";

export const useRemoveOrderItem = () =>
  useQuery<IOrderRequest>([ReactQueryKey.DeleteOrderItem], () =>
    fetchRemoveOrderItem()
  );

export const useMutateOrderProduct = () =>
  useMutation<IOrderRequest, IOrderRequest, IOrderRequest>(
    [ReactQueryKey.SaveOrderProduct],
    (data: IOrderRequest) => fetchSaveOrderProduct(data)
  );

export const useMutateOrderItem = () =>
  useMutation<IOrderRequest, IOrderRequest, IOrderRequest>(
    [ReactQueryKey.SaveOrderItem],
    (data: IOrderRequest) => fetchSaveOrderItem(data)
  );

export const useOrderItemQuery = () =>
  useQuery<IOrderRequest>([ReactQueryKey.GetOrderItem], () =>
    fetchGetOrderItem()
  );

export const useOrderItemData = () => useOrderItemQuery().data;

export const useDeleteOrderItemQuery = () =>
  useQuery<IOrderRequest[]>(
    [ReactQueryKey.DeleteOrderItem],
    fetchRemoveOrderItem
  );
