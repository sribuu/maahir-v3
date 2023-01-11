import { useContext } from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import FillDetailDropshipperCardOrder from "@/src/features/reseller/shipment/fragments/fill_detail_dropshipper_card/FillDetailDropshipperCard.order";
import SingleBillCardShipment from "@/src/features/reseller/shipment/fragments/single_bill_card/SingleBillCard.shipment";
import SingleAddressModalShipment from "../../fragments/single_address_modal/SingleAddressModal.shipment";
import SingleUnfilledAddressCardShipment from "../../fragments/single_unfilled_address_card/SingleUnfilledAddressCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import SingleFilledAddressCardShipment from "../../fragments/single_filled_address_card/SingleFilledAddressCard.shipment";
import SingleShippingOptionscardShipment from "../../fragments/single_shipping_options_card/SingleShippingOptionsCard.shipment";
import SinglePaymentModalShipment from "../../fragments/single_payment_modal/SinglePaymentModal.shipment";
import { useSinglePaymentGetPayment } from "../../hooks/useGetPayment.shipment";
import { useSinglePaymentGetMaps } from "../../hooks/useGetMaps.shipment";

export interface ISingleShipmentContainerProps {}

export default function SingleShipmentContainer(
  props: ISingleShipmentContainerProps
) {
  useSinglePaymentGetPayment();
  useSinglePaymentGetMaps();
  const { state } = useContext(SingleShipmentContext);

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
              "grid grid-cols-3 justify-start content-start justify-items-start items-start",
              "gap-x-[3rem] w-full"
            )}
          >
            <div
              className={clsx(
                "col-span-2",
                "grid grid-cols-1 place-content-start place-items-start gap-y-[2.25rem]",
                "w-full"
              )}
            >
              {state.personal_information.filled.status ? (
                <SingleFilledAddressCardShipment />
              ) : (
                <SingleUnfilledAddressCardShipment />
              )}

              <SingleAddressModalShipment />

              <FillDetailDropshipperCardOrder />

              <SingleShippingOptionscardShipment />
              <SinglePaymentModalShipment />
            </div>

            <SingleBillCardShipment />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
