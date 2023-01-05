import React, { useState, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import DropdownItemCart from "../dropdown_item/DropdownItem.cart";
import { RouterPathName } from "@/src/core/lib/constants";
import { useGlobalCartGetCartItems } from "../../hooks/useGetCartItems";

import { ResellerCartContext } from "../../contexts/cart/Cart.context";

export interface IListItemDropdownCartProps {
  variant?: "transparent" | "normal";
}

ListItemDropdownCart.defaultProps = {
  variant: "normal",
};

export default function ListItemDropdownCart(
  props: IListItemDropdownCartProps
) {
  const router = useRouter();
  useGlobalCartGetCartItems();
  const { state, dispatch } = useContext(ResellerCartContext);

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
      <button
        className={clsx(
          "relative",
          "w-[2rem] h-[2rem] rounded-[0.5rem]",
          props.variant === "transparent" ? "bg-white" : "bg-ocean-boat-blue",
          "flex items-center justify-center"
        )}
        onClick={handleMouseClick}
      >
        <img
          src={
            props.variant === "transparent"
              ? "/icons/shopping-cart-blue.svg"
              : "/icons/shopping-cart-white.svg"
          }
          width={24}
          height={24}
          loading={"lazy"}
        />

        {!state.is_empty && (
          <div
            className={clsx(
              "absolute top-[-8px] right-[-8px] z-30",
              "w-[1rem] h-[1rem] rounded-[0.5rem]",
              "bg-tart-orange",
              "border border-white"
            )}
          >
            <p className={clsx("text-[0.625rem] text-white font-medium")}>
              {state.total_number}
            </p>
          </div>
        )}
      </button>

      {/* body */}

      {/* cart non empty */}
      {!state.is_empty && (
        <div
          className={clsx(
            "absolute top-[4.5rem] right-[0px]",
            "gap-y-[1.5rem] grid-cols-1 items-start content-start",
            "p-6 rounded-[1rem] border box-border w-[420px] overflow-hidden",
            "bg-white shadow-1 border-bright-gray",
            open ? "hidden sm:grid" : "hidden"
          )}
          onMouseLeave={handleMouseLeave}
        >
          <p
            className={clsx(
              "text-[1.25rem] text-charleston-green font-regular"
            )}
          >
            {`Pesanan Kamu (${state.total_number})`}
          </p>

          {/* items */}
          {state.items?.length > 0 &&
            state.items?.map((item, index) => (
              <DropdownItemCart
                key={index}
                id={String(item?.variant_id)}
                productName={item?.name}
                categoryName={item?.category_name}
                quantity={item?.quantity}
                image={item?.image}
              />
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
      {state.is_empty && (
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
