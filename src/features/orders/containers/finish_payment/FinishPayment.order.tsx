import * as React from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";

export interface IFinishPaymentOrderContainerProps {}

export default function FinishPaymentOrderContainer(
  props: IFinishPaymentOrderContainerProps
) {
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
      </div>
    </MainLayout>
  );
}
