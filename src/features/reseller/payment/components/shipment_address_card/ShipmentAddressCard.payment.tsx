import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";

export interface IShipmentAddressCardPaymentProps {
  title?: string;
  nameText?: string;
  name?: string;
  emailText?: string;
  email?: string;
  mobileText?: string;
  mobile?: string;
  addressText?: string;
  address?: string;
  detailAddressText?: string;
  detailAddress?: string;
}

ShipmentAddressCardPayment.defaultProps = {
  title: "Alamat Pengantaran",
  nameText: "Nama",
  name: "Nina NR",
  emailText: "Email",
  email: "ninanurita99@gmail.com",
  mobileText: "Nomor HP",
  mobile: "08111773208",
  addressText: "Alamat",
  address: "Gambir, Jakarta Pusat, DKI Jakarta. 10130",
  detailAddressText: "Detail Alamat",
  detailAddress:
    "Jln. Agus Salim, Haji, No. Ganjil 3 - 11A - Kel. Gambir, Kec. Gambir, JAKARTA PUSAT",
};

export default function ShipmentAddressCardPayment(
  props: IShipmentAddressCardPaymentProps
) {
  return (
    <CardComponent>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start",
          "gap-y-[1.5rem] p-[1.5rem]"
        )}
      >
        <div className={clsx("flex justify-between items-center", "w-full")}>
          <h3 className={clsx("text-[1rem] text-dark-charcoal font-bold")}>
            {props.title}
          </h3>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.25rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.125rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] text-independence font-regular")}>
                {props.nameText}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-dark-charcoal font-regular"
                )}
              >
                {props.name}
              </p>
            </div>
          </div>

          <div className={clsx("flex items-center justify-between", "w-full")}>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.125rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] text-independence font-regular")}>
                {props.emailText}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-dark-charcoal font-regular"
                )}
              >
                {props.email}
              </p>
            </div>

            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.125rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] text-independence font-regular")}>
                {props.mobileText}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-dark-charcoal font-regular"
                )}
              >
                {props.mobile}
              </p>
            </div>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.125rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] text-independence font-regular")}>
                {props.addressText}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-dark-charcoal font-regular"
                )}
              >
                {props.address}
              </p>
            </div>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.125rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] text-independence font-regular")}>
                {props.detailAddressText}
              </p>
              <p
                className={clsx(
                  "text-[1.25rem] text-dark-charcoal font-regular"
                )}
              >
                {props.detailAddress}
              </p>
            </div>
          </div>
          {/* end */}
        </div>
      </div>
    </CardComponent>
  );
}
