import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import { ICart } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { RouterPathName } from "@/src/core/lib/constants";

export interface IListItemDropdownCartProps {
  variant?: "transparent" | "normal";
  cartData?: ICart[];
}

ListItemDropdownCart.defaultProps = {
  variant: "normal",
  cartData: [],
};

export default function ListItemDropdownCart(
  props: IListItemDropdownCartProps
) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleMouseOver = (e?: React.MouseEvent<HTMLDivElement>) => {
    setOpen(true);
  };

  const handleMouseLeave = (e?: React.MouseEvent<HTMLDivElement>) => {
    setOpen(false);
  };
  const handleMouseClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    router.push(RouterPathName.AllCartItems);
  };

  return (
    <div
      className={clsx("relative", "flex items-center")}
      onMouseOver={handleMouseOver}
    >
      <button className={clsx("relative")} onClick={handleMouseClick}>
        <img
          src={
            props.variant === "transparent"
              ? "/icons/shopping-cart-white.svg"
              : "/icons/shopping-cart-black.svg"
          }
          width={24}
          height={24}
          loading={"lazy"}
        />

        {props.cartData !== undefined && props.cartData.length > 0 && (
          <div
            className={clsx(
              "absolute top-[-8px] right-[-8px] z-30",
              "w-[1rem] h-[1rem] rounded-[0.5rem]",
              "bg-tart-orange",
              "border border-white"
            )}
          >
            <p className={clsx("text-[0.625rem] text-white font-medium")}>
              {props.cartData.length}
            </p>
          </div>
        )}
      </button>

      {/* body */}

      {/* cart non empty */}
      {props.cartData !== undefined && props.cartData.length > 0 && (
        <div
          className={clsx(
            "absolute top-[4.5rem] right-[0px]",
            "grid gap-y-[1.5rem] grid-cols-1 items-start content-start",
            "p-6 rounded-[1rem] border box-border w-[420px] overflow-hidden",
            "bg-white shadow-1 border-bright-gray",
            open ? "block" : "hidden"
          )}
          onMouseLeave={handleMouseLeave}
        >
          <p
            className={clsx(
              "text-[1.25rem] text-charleston-green font-regular"
            )}
          >
            {`Pesanan Kamu (${props.cartData.length})`}
          </p>

          {/* items */}
          {props.cartData
            .filter((_, index) => index < 3)
            .map((item, index) => (
              <div
                key={index}
                className={clsx(
                  "flex gap-x-[1.5rem] items-center content-start",
                  "w-full"
                )}
              >
                <img
                  src={item.image}
                  className={clsx(
                    "object-cover",
                    "w-[5rem] h-[5rem] rounded-[0.5rem]"
                  )}
                />

                {/* description */}
                <div
                  className={clsx("grid grid-cols-1", "w-full gap-y-[0.5rem]")}
                >
                  <div className={clsx("grid grid-cols-1", "w-full")}>
                    <p
                      className={clsx(
                        "text-[0.75rem] text-taupe-gray font-regular"
                      )}
                    >
                      {"Kecantikan"}
                    </p>

                    {/* TODO: techdebt ellipsis */}
                    <div
                      className={clsx(
                        "h-[1.5rem] overflow-hidden text-ellipsis"
                      )}
                    >
                      <p
                        className={clsx(
                          "text-[0.875rem] text-dark-charcoal font-regular text-ellipsis"
                        )}
                      >
                        {item.title}
                      </p>
                    </div>
                    {/* <p
                       className={clsx(
                         "text-[0.875rem] text-dark-charcoal font-regular text-ellipsis overflow-hidden",
                       )}
                     >
                       {
                         "Paket Reseller Parfum Wanita Botol Kaca Paket Reseller Parfum Wanita Botol Kaca"
                       }
                     </p> */}
                  </div>

                  <div
                    className={clsx(
                      "flex justify-between items-center",
                      "w-full"
                    )}
                  >
                    <p
                      className={clsx(
                        "text-[1rem] text-charleston-green font-bold"
                      )}
                    >
                      {thousandSeparator(item.price)}
                    </p>
                    <CounterComponent quantity={item.amount} />
                  </div>
                </div>
                {/* end description */}
              </div>
            ))}

          {/* end items */}

          {/* link to see cart */}
          <div className={clsx("flex items-center justify-center", "w-full")}>
            <Link href={"/cart"}>
              <p
                className={clsx(
                  "text-[0.875rem] text-ocean-boat-blue font-bold"
                )}
              >
                {"Lihat Keranjang"}
              </p>
            </Link>
          </div>

          {/* end link to see cart */}
        </div>
      )}
      {/* end non empty cart */}

      {/* empty cart */}
      {props.cartData !== undefined && !props.cartData.length && (
        <div
          className={clsx(
            "absolute top-[4.5rem] right-[0px]",
            "grid gap-y-[1.5rem] grid-cols-1 place-content-center place-items-center",
            "p-6 rounded-[1rem] border box-border w-[420px] overflow-hidden",
            "bg-white shadow-1 border-bright-gray",
            open ? "block" : "hidden"
          )}
          onMouseLeave={handleMouseLeave}
        >
          <img src={"/illustrations/empty-cart.svg"} />
          <p
            className={clsx(
              "text-[1.25rem] text-charleston-green font-regular"
            )}
          >
            {"Keranjangmu Kosong"}
          </p>
        </div>
      )}
      {/* end empty cart */}

      {/* end body */}
    </div>
  );
}
