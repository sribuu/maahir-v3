import * as React from "react";
import clsx from "clsx";

export interface IHeadlineProductsProps {
  title: string;
  description: string;
}
HeadlineProducts.defaultProps = {
  title: "Produk jualan paling viral buat kamu",
  description:
    "Beli paket reseller di Maahir by Sribuu, dan dapatkan paket konten gratis!",
};
export default function HeadlineProducts(props: IHeadlineProductsProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-center content-start justify-items-center",
        "gap-y-2 w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 justify-start content-start justify-items-start",
          "gap-y-2 max-w-[75rem] w-full"
        )}
      >
        <h1
          className={clsx("text-[2.25rem] font-bold", "text-charleston-green")}
        >
          {props.title}
        </h1>
        <p className={clsx("text-base font-regular", "text-independence")}>
          {props.description}
        </p>
      </div>
    </div>
  );
}
