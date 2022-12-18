import { useMutation } from "@tanstack/react-query";
import { CartReactQueryKey } from "../constants";
import {
  ResellerCartCreateOrderItemRequest,
  ResellerCartCreateOrderItemResponse,
} from "../models";
import { fetchCreateOrderItem } from "../services/create_order_item";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { CartContext } from "../contexts/cart/Cart.context";

export const useHomeCartCreateOrderItem = () => {
  const { state } = useContext(CartContext);
  const mutation = useMutation<
    ResellerCartCreateOrderItemRequest,
    ResellerCartCreateOrderItemRequest,
    ResellerCartCreateOrderItemResponse
  >(
    [CartReactQueryKey.CreateOrderItem],
    (data: ResellerCartCreateOrderItemRequest) => {
      const orderId = String(uuid());

      const payload: ResellerCartCreateOrderItemRequest = {
        order_id: orderId,
        orders: state.cart.items
          .filter((item) => state.cart.selected_items.includes(item.id))
          .map((item) => {
            return {
              ...item,
              name: item.title,
              product_id: item.id,
              quantity: item.amount,
              notes: item.note,
              price: item.price,
              image: item.image,
            };
          }),
      };
      return fetchCreateOrderItem(data);
    }
  );
  return mutation;
};
