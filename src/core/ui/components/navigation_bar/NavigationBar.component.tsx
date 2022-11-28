import * as React from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <nav
      className={clsx(
        "flex justify-center fixed top-0 right-0 left-0 z-50",
        props.variant === "transparent"
          ? "bg-gradient-to-r from-mauve to-caribbean-green"
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
                <button
                  key={index}
                  className={clsx(
                    "px-4 py-2 rounded-lg",
                    pathname === item.link && props.variant === "transparent"
                      ? "bg-white"
                      : pathname !== item.link &&
                        props.variant === "transparent"
                      ? "bg-white"
                      : "bg-ocean-boat-blue",
                    pathname === item.link ? "bg-opacity-100" : "bg-opacity-0"
                  )}
                >
                  <p
                    className={clsx(
                      "font-medium text-sm",
                      props.variant === "normal" && pathname === item.link
                        ? "text-white"
                        : props.variant === "normal" && pathname !== item.link
                        ? "text-charleston-green"
                        : props.variant === "transparent" &&
                          pathname === item.link
                        ? "text-ocean-boat-blue"
                        : "text-white"
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
