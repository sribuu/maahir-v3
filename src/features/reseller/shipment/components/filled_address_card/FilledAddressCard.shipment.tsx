import * as React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";
import PhoneIcon from "@/src/core/ui/icons/phone/Phone.icon";
import EmailIcon from "@/src/core/ui/icons/email/Email.icon";

export interface IFilledAddressCardShipmentProps {
  title?: string;
  name?: string;
  email?: string;
  mobile?: string;
  address?: string;
  detailAddress?: string;
  ctaText?: string;
  onChangeAddress?: () => void;
}

FilledAddressCardShipment.defaultProps = {
  title: "Alamat Pengantaran",
  name: "Nina Nursita",
  email: "ninanurita99@gmail.com",
  mobile: "08111773208",
  address: "Gambir, Jakarta Pusat, DKI Jakarta. 10130",
  detailAddress: "Jln. Agus Salim, Haji, No. Ganjil 3 - 11A - Kel. Gambir",
  ctaText: "Ubah Alamat",
};

export default function FilledAddressCardShipment(
  props: IFilledAddressCardShipmentProps
) {
  const handleChangeAddress = () => {
    if (props.onChangeAddress) {
      props.onChangeAddress();
    }
  };
  return (
    <CardComponent>
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1rem]",
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
          <div className={clsx("grid grid-cols-1 gap-y-[0.625rem]")}>
            <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
              {props.name}
            </p>

            {/* email & telp */}
            <div
              className={clsx("flex items-center justify-start gap-x-[1rem]")}
            >
              <div
                className={clsx(
                  "flex items-center justify-start gap-x-[0.5rem]"
                )}
              >
                <PhoneIcon
                  className={clsx(
                    "fill-independence",
                    "w-[1.25rem] h-[1.25rem]"
                  )}
                />
                <p
                  className={clsx(
                    "text-[1rem] text-charleston-green font-regular"
                  )}
                >
                  {props.mobile}
                </p>
              </div>

              <div className={clsx("w-[1px] h-[1.25rem]", "bg-taupe-gray")} />

              <div
                className={clsx(
                  "flex items-center justify-start gap-x-[0.5rem]"
                )}
              >
                <EmailIcon
                  className={clsx(
                    "fill-independence",
                    "w-[1.25rem] h-[1.25rem]"
                  )}
                />
                <p
                  className={clsx(
                    "text-[1rem] text-charleston-green font-regular"
                  )}
                >
                  {props.email}
                </p>
              </div>
            </div>

            {/* address */}
            <div className={clsx("grid grid-cols-1 gap-y-[0.125rem]")}>
              <p
                className={clsx(
                  "text-[1rem] text-charleston-green font-regular"
                )}
              >
                {props.address}
              </p>
              <p
                className={clsx(
                  "text-[1rem] text-charleston-green font-regular"
                )}
              >
                {props.detailAddress}
              </p>
            </div>
          </div>

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
            onClick={handleChangeAddress}
          >
            {props.ctaText}
          </button>
        </div>
      </div>
    </CardComponent>
  );
}
