import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import SearchInputComponent from "@/src/core/ui/components/search_input/SearchInput.component";
import TabComponent from "@/src/core/ui/components/tab/Tab.component";
import UnprocessedOrderTableOrder from "../unprocessed_table/UnprocessedTable.order";
import { usePayloadSupplierProduct, useSearchSupplierProduct, useSwitchTabSupplierProduct } from "@/src/features/manage_products/hooks/useSupplierProductState";

export interface IManagementCardOrderProps {}

export default function ManagementCardOrder(props: IManagementCardOrderProps) {
  const { activeTab, setActiveTab } = useSwitchTabSupplierProduct();
  
  const { search, setSearch } = useSearchSupplierProduct();
  
  const tabList = ["Belum Diproses", "Dalam Pengemasan", "Dikirim", "Diterima"];

  const { payload, setPayload } = usePayloadSupplierProduct();


  const handleSelect = (data: number) => {
    setActiveTab(data);
    setSearch("");
    setPayload({
      ...payload,
      title_like: "",
      is_show: data === 0,
    });
  };

  const handleSearch = (data: string) => {
    setSearch(data);
    setPayload({
      ...payload,
      title_like: data,
    });
  };

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
          <TabComponent list={tabList} onSelect={handleSelect}/>
          {/* end tab */}

          {/* right */}
          <div className={clsx("flex justify-end items-center gap-x-[1rem]")}>
            <SearchInputComponent 
            label="Cek Order ID Disini"
            placeholder={"Cari produk disini"}
            onSearch={handleSearch}
            />
          </div>
        </div>

        {/* body */}
        <UnprocessedOrderTableOrder />
      </div>
    </CardComponent>
  );
}
