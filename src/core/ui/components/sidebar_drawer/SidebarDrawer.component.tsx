import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import BackdropComponent from "../backdrop/Backdrop.component";
import NavigationIcon from "../../icons/navigation/Navigation.icon";
import Link from "next/link";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";
import HamburgerMenuIcon from "../../icons/hamburger_menu/HamburgerMenu.icon";

export interface ISidebarDrawerComponentProps {
  variant?: string;
  menu?: { name: string; link: string }[];
  onClose?: () => void;
  open?: boolean;
}

SidebarDrawerComponent.defaultProps = {
  variant: "",
  menu: [],
  open: false,
};

export default function SidebarDrawerComponent(
  props: ISidebarDrawerComponentProps
) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };

  const handleClickBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button className={clsx("block sm:hidden")} onClick={handleClickOpen}>
        <HamburgerMenuIcon
          className={clsx("w-[28px] h-[28px] sm:hidden")}
          fill={props.variant === "normal" ? "#232931" : "white"}
          stroke={props.variant === "normal" ? "#232931" : "white"}
        />
      </button>

      <div className={clsx(open ? "block" : "hidden")}>
        <BackdropComponent onClick={handleClickClose}>
          <div
            ref={ref}
            className={clsx("bg-white", "w-[236px] min-h-[100vh]")}
          >
            <div
              className={clsx(
                "h-[4rem] w-full",
                "border-b border-b-bright-gray",
                "box-border",
                "px-[1rem]",
                "flex items-center justify-start gap-x-[0.5rem]"
              )}
            >
              <button onClick={handleClickBack}>
                <NavigationIcon
                  className={clsx(
                    "w-[1.5rem] h-[1.5rem]",
                    "fill-cetacean-blue"
                  )}
                />
              </button>

              <h1
                className={clsx("text-cetacean-blue text-[1.25rem] font-bold")}
              >
                {"Menu"}
              </h1>
            </div>

            <div
              className={clsx(
                "p-[1rem]",
                "grid grid-cols-1 gap-y-[1rem]",
                "w-full"
              )}
            >
              {props.menu?.map((item, index) => (
                <Link key={index} href={item.link}>
                  <p
                    className={clsx(
                      "text-[0.75rem] font-medium text-charleston-green"
                    )}
                  >
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </BackdropComponent>
      </div>
    </>
  );
}
