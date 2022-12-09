import { useContext } from "react";
import Link from "next/link";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import SearchInputComponent from "@/src/core/ui/components/search_input/SearchInput.component";
import ShowCaseTableProduct from "../showcase_table/ShowCaseTable.product";
import TabComponent from "@/src/core/ui/components/tab/Tab.component";

import HiddenTableProduct from "../hidden_table/HiddenTable.product";

import { RouterPathName } from "@/src/core/lib/constants";
import { ViewSupplierProductContext } from "../../contexts/view/ViewSupplierProduct.context";
import { ViewSupplierProductActionEnum } from "../../contexts/view/ViewSupplierProduct.types";

export interface IManagementCardProductProps {}

export default function ManagementCardProduct(
  props: IManagementCardProductProps
) {
  const { state, dispatch } = useContext(ViewSupplierProductContext);

  const handleSelect = (data: number) => {
    dispatch({
      type: ViewSupplierProductActionEnum.SetActiveTab,
      payload: data,
    });
    dispatch({
      type: ViewSupplierProductActionEnum.SetSearch,
      payload: "",
    });
    dispatch({
      type: ViewSupplierProductActionEnum.ChangeCurrentPage,
      payload: 1,
    });
  };

  const handleSearch = (data: string) => {
    dispatch({
      type: ViewSupplierProductActionEnum.SetSearch,
      payload: data,
    });
  };

  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div className={clsx("grid grid-cols-1 gap-y-[2rem]", "w-full")}>
        {/* header */}
        <div
          className={clsx(
            "flex items-start justify-between gap-x-[2rem]",
            "w-full"
          )}
        >
          {/* tab */}
          <TabComponent
            active={state.tab.active}
            list={state.tab.list}
            onSelect={handleSelect}
          />
          {/* end tab */}

          {/* right */}
          <div className={clsx("flex justify-end items-center gap-x-[1rem]")}>
            <SearchInputComponent
              value={state.search}
              placeholder={"Cari produk disini"}
              onSearch={handleSearch}
            />
            <Link href={RouterPathName.SupplierAddProduct}>
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
            </Link>
          </div>
        </div>

        {state.tab.active === 0 && <ShowCaseTableProduct />}

        {state.tab.active === 1 && <HiddenTableProduct />}
      </div>
    </CardComponent>
  );
}
