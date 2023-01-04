import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import UnprocessedOrderTableHome from "../unprocessed_order_table/UnprocessedOrderTable.home";
import Link from "next/link";
import { RouterPathName } from "@/src/core/lib/constants";

export interface IUnprocessedOrderCardHomeProps {}

export default function UnprocessedOrderCardHome(
  props: IUnprocessedOrderCardHomeProps
) {
  return (
    <CardComponent className={clsx("p-[1.25rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "flex justify-between items-center gap-x-[1rem]",
            "w-full"
          )}
        >
          <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]")}>
            <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
              {"Pesanan Belum Diproses"}
            </p>
            <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
              {"Total Pesanan belum di proses:"}
            </p>
          </div>
          <Link href={RouterPathName.SupplierOrderManagement}>
            <p
              className={clsx("text-[0.875rem] text-ocean-boat-blue font-bold")}
            >
              {"See all"}
            </p>
          </Link>
        </div>

        {/* tabel */}
        <UnprocessedOrderTableHome />
      </div>
    </CardComponent>
  );
}
