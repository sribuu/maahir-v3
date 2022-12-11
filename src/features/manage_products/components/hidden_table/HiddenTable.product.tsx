import React, { useContext, useState } from "react";
import clsx from "clsx";
import ProductNotFoundSectionHome from "../../../products/fragments/product_not_found_section/ProductNotFoundSection";
import PencilIcon from "@/src/core/ui/icons/pencil/Pencil.icon";
import HideIcon from "@/src/core/ui/icons/hide/Hide.icon";
import { useViewSupplierProductChangeViewProduct } from "../../hooks/useGetChangeViewSupplierProduct";
import { useViewSupplierProductGetSupplierProductList } from "../../hooks/useGetSupplierProducts";
import { ViewSupplierProductContext } from "../../contexts/view/ViewSupplierProduct.context";
import VariantHiddenAccordionManageProduct from "../variant_hidden_accordion/VariantHiddenAccordion.manage_product";
import ItemCountPaginationComponent from "@/src/core/ui/components/item_count_pagination/ItemCountPagination.component";
import PaginationComponent from "@/src/core/ui/components/pagination/Pagination.component";
import { ViewSupplierProductActionEnum } from "../../contexts/view/ViewSupplierProduct.types";

export interface IHiddenTableProductProps {}

HiddenTableProduct.defaultProps = {};

export default function HiddenTableProduct(props: IHiddenTableProductProps) {
  const { isLoading: isLoadingSupplierProduct } =
    useViewSupplierProductGetSupplierProductList();
  const { state, dispatch } = useContext(ViewSupplierProductContext);

  const headList = [
    "Gambar",
    "Produk ID",
    "Produk",
    "Deskripsi",
    "Stok",
    "Kategori",
    "Pilihan Aksi",
  ];
  const { mutate: showProduct } = useViewSupplierProductChangeViewProduct();

  if (isLoadingSupplierProduct) {
    return <div></div>;
  }

  const isEmptySupplierProduct = !state.items?.length;
  if (isEmptySupplierProduct) {
    return <ProductNotFoundSectionHome />;
  }

  const handleClickShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    showProduct({ id: parseInt(e.currentTarget.id) });
  };

  const handleChangeCurrentPage = (data: number) => {
    dispatch({
      type: ViewSupplierProductActionEnum.ChangeCurrentPage,
      payload: data,
    });
  };

  return (
    <div className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "w-full")}>
      <div
        className={clsx(
          "grid grid-cols-7 items-center content-center",
          "pb-[4px] border-b border-b-bright-gray",
          "w-full h-[58px] p-[1rem]",
          "box-border"
        )}
      >
        {headList.map((item, index) => (
          <p
            key={index}
            className={clsx("text-[1rem] font-medium text-charleston-green")}
          >
            {item}
          </p>
        ))}
      </div>

      <div>
        {state.items.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "grid grid-cols-1",
                "w-full pb-[0.5rem]",
                index < state.items.length - 1 &&
                  "border-b border-b-bright-gray"
              )}
            >
              <div
                className={clsx(
                  "text-center",
                  "p-[1rem]",
                  "grid grid-cols-7 items-center content-center"
                )}
              >
                {Object.keys(item).map((tdKey, tdIndex) => (
                  <div
                    key={tdIndex}
                    className={clsx(
                      "h-[6.25rem]",
                      "flex items-center",

                      tdKey === "name"
                        ? "w-[192px]"
                        : tdKey === "description"
                        ? "w-[250px]"
                        : "max-w-[100%]"
                    )}
                  >
                    {tdKey === "image" && (
                      <img
                        src={item.image}
                        className={clsx(
                          "w-[76px] h-[76px] rounded-[0.5rem]",
                          "object-cover"
                        )}
                      />
                    )}

                    {tdKey !== "image" &&
                      tdKey !== "action" &&
                      tdKey !== "variant" && (
                        <div
                          className={clsx(
                            "overflow-hidden text-ellipsis",
                            "text-[0.875rem] font-regular text-charleston-green text-start"
                          )}
                        >
                          <p
                            className={clsx(
                              "text-ellipsis",
                              "text-[0.875rem] font-regular text-charleston-green text-start"
                            )}
                          >
                            {item[tdKey]}
                          </p>
                        </div>
                      )}

                    {tdKey === "variant" && (
                      <div
                        className={clsx(
                          "flex items-center justify-center gap-x-[1rem]"
                        )}
                      >
                        <button id={String(item.product_id)}>
                          <PencilIcon
                            className={clsx(
                              "w-[1.5rem] h-[1.5rem]",
                              "fill-charleston-green hover:fill-ocean-boat-blue"
                            )}
                          />
                        </button>

                        <button
                          id={String(item.product_id)}
                          onClick={handleClickShow}
                        >
                          <HideIcon
                            className={clsx(
                              "w-[1.5rem] h-[1.5rem]",
                              "fill-charleston-green hover:fill-ocean-boat-blue"
                            )}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* accordion */}
              {item.variant.list.length > 0 && (
                <VariantHiddenAccordionManageProduct
                  variantItem={item.variant.list}
                  total={item.variant.total}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className={clsx("flex justify-between items-center", "w-full")}>
        <ItemCountPaginationComponent
          firstIndexData={state.item_counts.first_item_index}
          lastIndexData={state.item_counts.last_item_index}
          totalItem={state.item_counts.total}
        />
        <PaginationComponent
          totalPage={state.pagination.total_page}
          currentPage={state.pagination.current_page}
          onChangePage={handleChangeCurrentPage}
        />
      </div>
    </div>
  );
}
