import * as React from "react";
import clsx from "clsx";

export interface IItemNotFoundProductProps {}

export default function ItemNotFoundProduct(props: IItemNotFoundProductProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-[56.25rem] h-[40rem]"
      )}
    >
      <img src={"/illustrations/product-item-not-found.svg"} />
      <p
        className={clsx(
          "text-[1.5rem] font-bold text-charleston-green text-center"
        )}
      >
        {"Tidak ada produk yang ditemukan"}
      </p>
      <p
        className={clsx(
          "text-[1rem] font-regular text-independence text-center"
        )}
      >
        {"Coba sesuaikan pencarianmu untuk menemukan apa yang kamu cari"}
      </p>
      <div></div>
    </div>
  );
}
