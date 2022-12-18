import * as React from "react";
import Link from "next/link";
import clsx from "clsx";

export interface IFooterComponentProps {
  menus: { name: string; link: string }[];
  socialMedia: { name: string; icon: string; link: string }[];
}

FooterComponent.defaultProps = {
  menus: [],
  socialMedia: [],
};

export default function FooterComponent(props: IFooterComponentProps) {
  const credits = [
    "Copyright © 2023. Maahir. All rights reserved.",
    "Maahir is Public Domain.",
  ];
  return (
    <footer className={clsx("flex justify-center")}>
      <div
        className={clsx(
          "grid justify-start max-w-screen-xl w-full grid-cols-1",
          "gap-y-[40px] sm:gap-y-[6.25rem]",
          "py-[40px] sm:py-[4.5rem]"
        )}
      >
        <div
          className={clsx(
            "grid items-center content-center",
            "justify-center sm:justify-between justify-items-center sm:justify-items-start",
            "grid-cols-1 sm:grid-cols-[auto_auto_auto]",
            "gap-y-[1.5rem] sm:gap-y-[0rem]",
            "w-full"
          )}
        >
          <img
            src={"/logo/maahir-grey.svg"}
            width={130}
            height={70}
            loading={"lazy"}
          />

          <div
            className={clsx(
              "flex content-center justify-center",
              "gap-x-[1.25rem] sm:gap-x-[4rem] flex-wrap",
              "max-w-[228px] sm:max-w-[100%]",
              "w-full"
            )}
          >
            {props.menus.length > 0 &&
              props.menus.map((item, index) => (
                <Link key={index} href={item.link}>
                  <button
                    key={index}
                    className={clsx(
                      "px-[0rem] sm:px-[1rem] py-[0rem] sm:py-[0.5rem] rounded-lg"
                    )}
                  >
                    <p
                      className={clsx(
                        "font-regular sm:font-medium",
                        "text-[0.75rem] sm:text-[0.875rem]",
                        "text-charleston-green"
                      )}
                    >
                      {item.name}
                    </p>
                  </button>
                </Link>
              ))}
          </div>

          <div
            className={clsx("flex gap-[1.875rem] content-center items-center")}
          >
            {props.socialMedia.length > 0 &&
              props.socialMedia.map((item, index) => (
                <Link key={index} href={item.link} target={"_blank"}>
                  <img
                    src={item.icon}
                    width={20}
                    height={20}
                    loading={"lazy"}
                  />
                </Link>
              ))}
          </div>
        </div>
        {/* credits */}
        <div
          className={clsx(
            "grid gap-y-[0rem] sm:gap-y-[0.5rem] content-center items-center"
          )}
        >
          {credits.map((item, index) => (
            <p
              key={index}
              className={clsx(
                "font-regular text-[0.875rem] text-center",
                "text-wenge"
              )}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
