import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import SearchInputComponent from "@/src/core/ui/components/search_input/SearchInput.component";
import TabComponent from "@/src/core/ui/components/tab/Tab.component";
import UnprocessedOrderTableOrder from "../../../orders/fragments/unprocessed_table/UnprocessedTable.order";

export interface IManagementCardOrderProps {}

export default function ManagementCardOrder(props: IManagementCardOrderProps) {
  const tabList = ["Belum Diproses", "Dalam Pengemasan", "Dikirim", "Diterima"];

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
          </div>
        </div>

        {/* body */}
        <UnprocessedOrderTableOrder />
      </div>
    </CardComponent>
  );
}
