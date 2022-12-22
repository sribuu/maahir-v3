import React, { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";

import FillDetailProductOrder from "@/src/features/orders/fragments/fill_detail_product_card/FillDetailProductCard.order";

import { useMutateOrderItem, useOrderItemData } from "../../hooks/useOrderItem";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";
import FillDetailDropshipperCardOrder from "../../fragments/fill_detail_dropshipper_card/FillDetailDropshipperCard.order";
import FillDetailCustomerCardOrder from "../../fragments/fill_detail_customer_card/FillDetailCustomerCard.order";
import FillDetailPaymentCardOrder from "@/src/features/orders/fragments/fill_detail_payment_card/FillDetailPaymentCard.order";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
export interface IFillDetailOrderContainerProps {}

export default function FillDetailOrderContainer(
  props: IFillDetailOrderContainerProps
) {
  const router = useRouter();
  const { validate, name, email, phonenumber, address, paymentMethod } =
    useFillDetailOrderContext();
  const orderItem = useOrderItemData();
  const { mutate: mutateOrderItem, isSuccess: isSuccessMutateOrderItem } =
    useMutateOrderItem();
  const handleSubmit = () => {
    if (validate) {
      mutateOrderItem({
        name: name,
        email: email,
        phone_number: phonenumber,
        address: address,
        orders: orderItem.orders,
        order_id: orderItem.order_id,
        payment_method: paymentMethod,
      });
    }
  };

  useEffect(() => {
    if (isSuccessMutateOrderItem) {
      router.replace({
        pathname: RouterPathName.OrderSummary,
        query: {
          [RouterQueryKey.ProductId]: String(router.query?.productId),
        },
      });
    }
  }, [isSuccessMutateOrderItem]);

  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-[1.5rem] w-full pt-[8.875rem] pb-[10rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-start content-start justify-items-start items-start",
            "gap-y-[1.5rem] max-w-[75rem] w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1.75rem] font-bold",
              "text-charleston-green"
            )}
          >
            {"Isi Detail Pesanan"}
          </p>

          {/* delivery address and your order card  */}
          <div
            className={clsx(
              "grid grid-cols-[674px_478px] justify-start content-start justify-items-start items-start",
              "gap-x-[3rem] w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[2.25rem]",
                "w-full"
              )}
            >
              <FillDetailCustomerCardOrder />

              <FillDetailDropshipperCardOrder />

              <FillDetailPaymentCardOrder />
            </div>

            <FillDetailProductOrder onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
