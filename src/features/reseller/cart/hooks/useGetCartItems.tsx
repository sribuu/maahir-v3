import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CartReactQueryKey, MyCartReactQueryKey } from "../constants";
import { ResellerCartContext } from "../contexts/cart/Cart.context";
import { IResellerCart } from "@/src/core/lib/models/reseller/cart";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { ResellerCartItemsActionEnum } from "../contexts/cart/Cart.types";
import { ResellerMyCartContext } from "../contexts/my_cart/MyCart.context";
import { ResellerMyCartActionsEnum } from "../contexts/my_cart/MyCart.types";
import { getCart } from "@/src/storage/reseller/cart";
import { useHomePostCheckProducts } from "./usePostCheckProducts.product";

// Global
export const useGlobalCartGetCartItems = () => {
  const { dispatch } = useContext(ResellerCartContext);
  const query = useQuery<IResellerCart[]>(
    [CartReactQueryKey.GetCartItems],
    getCart
  );

  useEffect(() => {
    if (!query.isFetching) {
      const totalQuantity: number = query?.data?.reduce((acc, item) => {
        const supplierItemTotal = item?.supplier?.data.reduce(
          (accSupplierItem, supplierItem) => {
            accSupplierItem = supplierItem.quantity + accSupplierItem;
            return accSupplierItem;
          },
          0
        );
        return acc + supplierItemTotal;
      }, 0);

      const isEmpty = totalQuantity <= 0;
      dispatch({
        type: ResellerCartItemsActionEnum.SetIsEmpty,
        payload: isEmpty,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const totalQuantity: number = query?.data?.reduce((acc, item) => {
        const supplierItemTotal = item?.supplier?.data.reduce(
          (accSupplierItem, supplierItem) => {
            accSupplierItem = supplierItem.quantity + accSupplierItem;
            return accSupplierItem;
          },
          0
        );
        return acc + supplierItemTotal;
      }, 0);

      dispatch({
        type: ResellerCartItemsActionEnum.SetTotalNumber,
        payload: totalQuantity,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const reformattedCart = query.data
        .filter((_, index) => index < 3)
        .map((item) => {
          return item?.supplier?.data?.map((supplierItem) => {
            return {
              category_name: supplierItem.category_name,
              name: supplierItem.product_name,
              price: thousandSeparator(supplierItem.price),
              image: supplierItem.image,
              quantity: supplierItem.quantity,
              product_id: supplierItem.product_id,
              variant_id: supplierItem.variant_id,
            };
          });
        })
        .flat(1);

      dispatch({
        type: ResellerCartItemsActionEnum.SetItems,
        payload: reformattedCart,
      });
    }
  }, [query.isFetching]);

  return query;
};

// MyCart
export const useMyCartGetCartItems = () => {
  const { state, dispatch } = useContext(ResellerMyCartContext);
  const { mutate: checkProducts } = useHomePostCheckProducts();
  const query = useQuery<IResellerCart[]>(
    [MyCartReactQueryKey.GetCartItems],
    getCart
  );

  useEffect(() => {
    if (!query.isFetching) {
      const totalQuantity: number = query?.data?.reduce((acc, item) => {
        const supplierItemTotal = item?.supplier?.data.reduce(
          (accSupplierItem, supplierItem) => {
            accSupplierItem = supplierItem.quantity + accSupplierItem;
            return accSupplierItem;
          },
          0
        );
        return acc + supplierItemTotal;
      }, 0);

      const isEmpty = totalQuantity <= 0;

      dispatch({
        type: ResellerMyCartActionsEnum.CheckItemIsEmpty,
        payload: isEmpty,
      });
    }
  }, [query.isFetching]);

  useEffect(() => {
    if (!query.isFetching) {
      const totalQuantity: number = query?.data?.reduce((acc, item) => {
        const supplierItemTotal = item?.supplier?.data.reduce(
          (accSupplierItem, supplierItem) => {
            accSupplierItem = supplierItem.quantity + accSupplierItem;
            return accSupplierItem;
          },
          0
        );
        return acc + supplierItemTotal;
      }, 0);

      dispatch({
        type: ResellerMyCartActionsEnum.SetTotalNumber,
        payload: totalQuantity,
      });
    }
  }, [query.isFetching]);

  // check products
  useEffect(() => {
    if (!query.isFetching && query.data !== undefined) {
      checkProducts({
        products: query.data
          .map((item) => {
            return item.supplier.data.map((supplierItem) => {
              return {
                id: supplierItem.product_id,
                variant_id: supplierItem.variant_id,
                notes: supplierItem.note,
                quantity: supplierItem.quantity,
              };
            });
          })
          .flat(1),
      });
    }
  }, [query.isFetching, query.data]);

  // DOCS: sample when there is unavailable cart
  // useEffect(() => {
  //   if (!query.isFetching && query.data !== undefined) {
  //     checkProducts({
  //       products: [
  //         ...query.data
  //           .map((item) => {
  //             return item.supplier.data.map((supplierItem) => {
  //               return {
  //                 id: supplierItem.product_id,
  //                 variant_id: supplierItem.variant_id,
  //                 notes: supplierItem.note,
  //                 quantity: supplierItem.quantity,
  //               };
  //             });
  //           })
  //           .flat(1),
  //         {
  //           id: 30,
  //           variant_id: 113,
  //           notes: "asdsadsa",
  //           quantity: 2,
  //         },
  //       ],
  //     });
  //   }
  // }, [query.isFetching, query.data]);

  return query;
};
