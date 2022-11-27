import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import SearchInputComponent from "@/src/core/ui/components/search_input/SearchInput.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import ShowCaseTableProduct from "../showcase_table/ShowCaseTable.product";
import TabComponent from "@/src/core/ui/components/tab/Tab.component";

export interface IManagementCardProductProps {}

export default function ManagementCardProduct(
  props: IManagementCardProductProps
) {
  const tabList = ["Etalase Produk", "Produk Disembunyikan"];

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div>
        {/* header */}
        <div
          className={clsx(
            "flex items-start justify-between gap-x-[2rem]",
            "w-full"
          )}
        >
          {/* tab */}
          <TabComponent list={tabList} />
          {/* end tab */}

          {/* right */}
          <div className={clsx("flex justify-end items-center gap-x-[1rem]")}>
            <SearchInputComponent />
            <button
              className={clsx(
                "bg-ocean-boat-blue",
                "rounded-[0.75rem] px-[0.875rem] py-[0.5rem] min-w-[144px]"
              )}
            >
              <p className={clsx("text-white font-regular text-[0.875rem]")}>
                {"Tambah Produk"}
              </p>
            </button>
          </div>
        </div>

        {/* body */}
        <ShowCaseTableProduct />
      </div>
    </CardComponent>
  );
}
