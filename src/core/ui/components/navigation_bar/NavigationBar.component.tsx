import * as React from "react";

import Link from "next/link";
import clsx from "clsx";

import ListItemDropdownCart from "@/src/features/cart/fragments/list_item_dropdown/ListItemDropdown.cart";
import { ICart } from "@/src/core/lib/models";

export interface INavigationBarComponentProps {
  menus: { name: string; link: string }[];
  variant: "transparent" | "normal";
  cartData?: ICart[];
}
NavigationBarComponent.defaultProps = {
  menus: [],
  variant: "normal",
  cartData: [],
};

export default function NavigationBarComponent(
  props: INavigationBarComponentProps
) {
  return (
    <nav
      className={clsx(
        "flex justify-center fixed top-0 right-0 left-0 z-50",
        props.variant === "transparent"
          ? "bg-gradient-to-r from-caribbean-green to-mauve"
          : "bg-white",
        props.variant === "transparent" ? "border-b-0" : "border-b",
        props.variant === "transparent"
          ? "border-b-transparent"
          : "border-b-bright-gray"
      )}
    >
      <div className={clsx("flex justify-between max-w-screen-xl w-full py-6")}>
        <Link href={"/"}>
          <img
            src={
              props.variant === "normal"
                ? "/logo/maahir-grey.svg"
                : "/logo/maahir-white.svg"
            }
            width={130}
            height={70}
            loading={"lazy"}
          />
        </Link>

        <div className={clsx("flex gap-16")}>
          {props.menus.length > 0 &&
            props.menus.map((item, index) => (
              <Link key={index} href={item.link}>
                <button key={index} className={clsx("px-4 py-2 rounded-lg")}>
                  <p
                    className={clsx(
                      "font-medium text-sm",
                      props.variant === "normal"
                        ? "text-charleston-green hover:text-ocean-boat-blue"
                        : "text-white hover:text-ocean-boat-blue"
                    )}
                  >
                    {item.name}
                  </p>
                </button>
              </Link>
            ))}

          <ListItemDropdownCart
            variant={props.variant}
            cartData={props.cartData}
          />
        </div>
      </div>
    </nav>
  );
}
