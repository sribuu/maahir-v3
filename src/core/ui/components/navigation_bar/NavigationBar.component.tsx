import * as React from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import clsx from "clsx";
import ListItemDropdownCart from "@/src/features/reseller/cart/fragments/list_item_dropdown/ListItemDropdown.cart";
import { ICart } from "@/src/core/lib/models";
import SidebarDrawerComponent from "../sidebar_drawer/SidebarDrawer.component";

export interface INavigationBarComponentProps {
  menus: { name: string; link: string }[];
  variant: "transparent" | "normal";
}
NavigationBarComponent.defaultProps = {
  menus: [],
  variant: "normal",
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
          : "border-b-bright-gray",
        "box-border",
        "max-h-[94px]"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between",
          "max-w-screen-xl w-full py-6",
          "px-[1.25rem] xl:px-[0rem]",
          "py-[1.125rem] sm:py-[0rem]"
        )}
      >
        <div className={clsx("flex gap-x-[0.5rem] items-center justify-start")}>
          <SidebarDrawerComponent menu={props.menus} variant={props.variant} />
          <Link href={"/"}>
            <img
              src={
                props.variant === "normal"
                  ? "/logo/maahir-grey.svg"
                  : "/logo/maahir-white.svg"
              }
              className={clsx("w-[100px] sm:w-[130px] h-[30px] sm:h-[70px]")}
              loading={"lazy"}
            />
          </Link>
        </div>

        <div className={clsx("flex", "md:gap-[0.5rem] lg:gap-16")}>
          <div className={clsx("hidden sm:flex", "md:gap-[0.5rem] lg:gap-16")}>
            {props.menus.length > 0 &&
              props.menus.map((item, index) => (
                <Link key={index} href={item.link}>
                  <button
                    key={index}
                    className={clsx(
                      "px-4 py-[0.5rem] rounded-lg",
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
          </div>

          <ListItemDropdownCart variant={props.variant} />
        </div>
      </div>
    </nav>
  );
}
