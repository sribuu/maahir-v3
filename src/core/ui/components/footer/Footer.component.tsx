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
          "grid justify-start max-w-screen-xl w-full grid-cols-1 py-[4.5rem] gap-y-[6.25rem]"
        )}
      >
        <div
          className={clsx(
            "flex justify-between w-full content-center items-center"
          )}
        >
          <img
            src={"/logo/maahir-grey.svg"}
            width={130}
            height={70}
            loading={"lazy"}
          />

          <div className={clsx("flex gap-16 content-center items-center")}>
            {props.menus.length > 0 &&
              props.menus.map((item, index) => (
                <Link key={index} href={item.link}>
                  <button key={index} className={clsx("px-4 py-2 rounded-lg")}>
                    <p
                      className={clsx(
                        "font-medium text-sm",
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
        <div className={clsx("grid gap-y-2 content-center items-center")}>
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
