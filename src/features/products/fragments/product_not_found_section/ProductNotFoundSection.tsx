import * as React from "react";
import clsx from "clsx";

export interface IProductNotFoundSectionHomeProps {}

export default function ProductNotFoundSectionHome(
  props: IProductNotFoundSectionHomeProps
) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]",
        "w-full py-[3.5rem]"
      )}
    >
      <img src={"/illustrations/supplier-product-not-found.svg"} />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[0.75rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-charleston-green font-bold text-[1.5rem]")}>
          {"Tidak ada produk ditemukan"}
        </p>
        <p className={clsx("text-independence font-regular text-[rem]")}>
          {"Coba sesuaikan ID pencarianmu untuk menemukan apa yang kamu cari"}
        </p>
      </div>
    </div>
  );
}
