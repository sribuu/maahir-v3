import * as React from "react";
import clsx from "clsx";

export interface IItemNotFoundProductProps {}

export default function ItemNotFoundProduct(props: IItemNotFoundProductProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-[100%] lg:w-[56.25rem] h-[18rem] sm:h-[30rem] lg:h-[40rem]"
      )}
    >
      <img
        src={"/illustrations/product-item-not-found.svg"}
        className={clsx("w-[136px] sm:w-[326px] h-[100px] sm:h-[240px]")}
      />
      <p
        className={clsx(
          "text-[1.25rem] sm:text-[1.5rem]",
          "font-bold text-charleston-green text-center"
        )}
      >
        {"Tidak ada produk yang ditemukan"}
      </p>
      <p
        className={clsx(
          "text-[0.875rem] sm:text-[1rem]",
          "font-regular text-independence text-center"
        )}
      >
        {"Coba sesuaikan pencarianmu untuk menemukan apa yang kamu cari"}
      </p>
      <div></div>
    </div>
  );
}
