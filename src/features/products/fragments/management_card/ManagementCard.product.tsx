import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import SearchInputComponent from "@/src/core/ui/components/search_input/SearchInput.component";
import ShowCaseTableProduct from "../showcase_table/ShowCaseTable.product";
import TabComponent from "@/src/core/ui/components/tab/Tab.component";
import {
  useGetSupplierProductList,
  useGetSupplierProductQuery,
} from "../../hooks/useSupplierProduct";
import { IGetSupplierProductRequest } from "../../models";

import HiddenTableProduct from "../hidden_table/HiddenTable.product";
import {
  usePayloadSupplierProduct,
  useSearchSupplierProduct,
  useSwitchTabSupplierProduct,
} from "../../hooks/useSupplierProductState";

export interface IManagementCardProductProps {}

export default function ManagementCardProduct(
  props: IManagementCardProductProps
) {
  const { activeTab, setActiveTab } = useSwitchTabSupplierProduct();
  const { search, setSearch } = useSearchSupplierProduct();

  const tabList = ["Etalase Produk", "Produk Disembunyikan"];

  const { payload, setPayload } = usePayloadSupplierProduct();

  const {
    data,
    isLoading: isLoadingSupplierProduct,
    isSuccess: isSuccessSupplierProduct,
  } = useGetSupplierProductQuery(payload);

  const list = useGetSupplierProductList(payload);

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
          <TabComponent list={tabList} onSelect={handleSelect} />
          {/* end tab */}

          {/* right */}
          <div className={clsx("flex justify-end items-center gap-x-[1rem]")}>
            <SearchInputComponent
              value={search}
              placeholder={"Cari produk disini"}
              onSearch={handleSearch}
            />
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

        {isLoadingSupplierProduct && <div />}
        {/* body */}
        {isSuccessSupplierProduct && (
          <>
            {activeTab === 0 && <ShowCaseTableProduct list={list} />}

            {activeTab === 1 && <HiddenTableProduct list={list} />}
          </>
        )}
      </div>
    </CardComponent>
  );
}
