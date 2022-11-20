import * as React from "react";
import clsx from "clsx";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IShoppingSummaryCardCartProps {
  id?: string;
  title?: string;
}

ShoppingSummaryCardCart.defaultProps = {
  title: "Ringkasan Belanja",
  id: "",
};

export default function ShoppingSummaryCardCart(
  props: IShoppingSummaryCardCartProps
) {
  return (
    <div
      className={clsx(
        "grid gap-y-[1.5rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <p className={clsx("text-[1.25rem] text-charleston-green font-regular")}>
        {props.title}
      </p>

      {/* item */}
      <div
        className={clsx(
          "flex gap-x-[1.25rem] justify-between items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid gap-y-[0.125rem] grid-cols-1 items-start content-start"
          )}
        >
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {"Paket Reseller Parfum Wanita Botol Kaca"}
          </p>
          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {"Qty: "}
            <span
              className={clsx(
                "text-[0.875rem] text-charleston-green font-regular"
              )}
            >
              {"3 items"}
            </span>
          </p>
        </div>
        <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {"Rp149.997"}
        </p>
      </div>
      {/* end item */}

      {/* divider */}
      <DividerComponent />
      {/* end divider */}

      {/* total price */}
      <div
        className={clsx(
          "flex gap-x-[1.25rem] justify-between items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid gap-y-[0.125rem] grid-cols-1 items-start content-start"
          )}
        >
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {"Total Harga"}
          </p>
          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {"6 items"}
          </p>
        </div>
        <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {"Rp2.297.996"}
        </p>
      </div>
      {/* end total price */}

      {/* divider */}
      <DividerComponent />
      {/* end divider */}

      {/* total payment */}
      <div
        className={clsx(
          "flex gap-x-[1.25rem] justify-between items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid gap-y-[0.125rem] grid-cols-1 items-start content-start"
          )}
        >
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {"Total Pembayaran"}
          </p>
        </div>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {"Rp2.297.996"}
        </p>
      </div>

      {/* end total payment */}
      {/* actions button */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem] place-content-start place-items-start"
        )}
      >
        <ButtonComponent
          id={props.id}
          intent={"primary"}
          size={"large"}
          className={"w-full"}
          //   onClick={handleClickBuyNow}
        >
          {"Pilih Metode Pembayaran"}
        </ButtonComponent>

        <ButtonComponent
          id={props.id}
          intent={"secondary"}
          size={"large"}
          className={"w-full"}
          //   onClick={props.onAddToCart}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
          {"Batalkan"}
        </ButtonComponent>
      </div>
    </div>
  );
}
