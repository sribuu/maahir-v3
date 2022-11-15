import * as React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import {
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import { fetchOrderById } from "@/src/core/lib/api/dynamic";
import { IOrder } from "@/src/core/lib/models";
import ConfirmationOrderCardComponent from "@/src/core/ui/components/confirmation_order_card/ConfirmationOrderCard.component";
import DeliveryAddressListCardComponent from "@/src/core/ui/components/delivery_address_list_card/DeliveryAddressListCard.component";
import VAPaymentInstructionCardComponent from "@/src/core/ui/components/va_payment_instruction_card/VAPaymentInstructionCard.component";
import EWalletPaymentInstructionCardComponent from "@/src/core/ui/components/ewallet_payment_instruction_card/EWalletPaymentInstructionCard.component";
import QRISPaymentInstructionCardComponent from "@/src/core/ui/components/qris_payment_instruction_card/QRISPaymentInstructionCard.component";
import moment from "moment";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IFinishPaymentOrderContainerProps {}

export default function FinishPaymentOrderContainer(
  props: IFinishPaymentOrderContainerProps
) {
  const router = useRouter();
  const { data: orderData, isLoading: isLoadingOrderData } = useQuery<IOrder>({
    queryKey: [ReactQueryKey.GetOrderByOrderCode],
    queryFn: () =>
      fetchOrderById(String(router.query[RouterQueryKey.OrderCode])),
  });

  const handleConfirmPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderCheckByCode,
      query: {
        [RouterQueryKey.OrderCode]: String(
          router.query[RouterQueryKey.OrderCode]
        ),
      },
    });
  };
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
            {"Selesaikan Pembayaran"}
          </p>
        </div>

        <div
          className={clsx(
            "grid grid-cols-[740px_412px] justify-start content-start justify-items-start items-start",
            "gap-x-[3rem] w-full"
          )}
        >
          {/* left */}
          <div
            className={clsx(
              "grid grid-cols-1 justify-start content-start justify-items-start items-start",
              "gap-y-[2.25rem] w-full"
            )}
          >
            {orderData.payment.payment_type === "VA" && (
              <VAPaymentInstructionCardComponent
                expiredDate={`${moment(orderData.payment.expired_at).format(
                  "DD MMMM YYYY, hh:mm:ss"
                )}`}
                paymentAccount={orderData.payment.target_account_number}
                totalPrice={orderData.total_amount}
                totalPriceFormatted={thousandSeparator(orderData.total_amount)}
              />
            )}
            {orderData.payment.payment_type === "EWALLET" && (
              <EWalletPaymentInstructionCardComponent
                name={orderData.payment.provider_name}
                logo={orderData.payment.payment_method.pic}
                expiredDate={`${moment(orderData.payment.expired_at).format(
                  "DD MMMM YYYY, hh:mm:ss"
                )}`}
              />
            )}
            {orderData.payment.payment_type === "QRIS" && (
              <QRISPaymentInstructionCardComponent
                paymentAccount={orderData.payment.target_account_number}
              />
            )}

            {/* delivery address */}

            <DeliveryAddressListCardComponent
              name={orderData.name}
              email={orderData.email}
              phone_number={orderData.phone_number}
              address={orderData.address.address}
              province={orderData.address.province}
              district={orderData.address.kecamatan}
              postal_code={orderData.address.postal_code}
            />
          </div>

          {/* right */}
          <div>
            <ConfirmationOrderCardComponent
              name={orderData.product.title}
              productSrc={orderData.product.image}
              quantity={orderData.quantity}
              onConfirm={handleConfirmPayment}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
