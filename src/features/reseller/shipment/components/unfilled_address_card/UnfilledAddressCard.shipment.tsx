import * as React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";

export interface IUnfilledAddressCardShipmentProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onClickCTAAddAddress?: () => void;
}

UnfilledAddressCardShipment.defaultProps = {
  title: "Alamat Pengantaran",
  description:
    "Belum ada detail alaman pengantaran kamu, yuk isi data alamatmu",
  ctaText: "Tambah Alamat",
};

export default function UnfilledAddressCardShipment(
  props: IUnfilledAddressCardShipmentProps
) {
  const handleClickCTAAddAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickCTAAddAddress) {
      props.onClickCTAAddAddress();
    }
  };
  return (
    <CardComponent>
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem]",
          "w-full",
          "p-[1.5rem]"
        )}
      >
        <h3 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h3>
        <div
          className={clsx(
            "flex items-center justify-between gap-x-[100px]",
            "w-full"
          )}
        >
          <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
            {props.description}
          </p>

          <button
            className={clsx(
              "flex items-center justify-center",
              "border border-ocean-boat-blue",
              "rounded-[0.75rem]",
              "px-[0.875rem] py-[0.5rem]",
              "bg-white",
              "text-[0.875rem] text-ocean-boat-blue font-bold",
              "box-border",
              "min-w-[156px]"
            )}
            onClick={handleClickCTAAddAddress}
          >
            {props.ctaText}
          </button>
        </div>
      </div>
    </CardComponent>
  );
}
