import React, { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";

import FillDetailProductOrder from "@/src/features/orders/fragments/fill_detail_product_card/FillDetailProductCard.order";

import { useMutateOrderItem, useOrderItemData } from "../../hooks/useOrderItem";
import { useFillDetailOrderContext } from "../../contexts/useFillDetailContext";
import SummaryCustomerOrderCard from "../../fragments/summary_customer_card/SummaryCustomerCard.order";
import SummaryPaymentCardOrder from "../../fragments/summary_payment_card/SummaryPaymentCard.order";
import SummaryProductCardOrder from "../../fragments/summary_product_card/SummaryProductCard.order";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
export interface ISummaryOrderContainerProps {}

export default function SummaryOrderContainer(
  props: ISummaryOrderContainerProps
) {
  const router = useRouter();
  const { validate, name, email, phonenumber, address, dropship } =
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
        dropshipper: dropship,
      });
    }
  };

  useEffect(() => {
    if (isSuccessMutateOrderItem) {
      router.replace({
        pathname: RouterPathName.FillOrderDetail,
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
              <SummaryPaymentCardOrder />

              <SummaryCustomerOrderCard />
            </div>

            <SummaryProductCardOrder onSubmit={handleSubmit} />
            {/* <FillDetailProductOrder onSubmit={handleSubmit} /> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
