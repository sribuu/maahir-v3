import { useState } from "react";
import clsx from "clsx";
import { ISupplierProductItem } from "../../models";
import ProductNotFoundSectionHome from "../product_not_found_section/ProductNotFoundSection";

export interface IShowCaseTableProductProps {
  list?: ISupplierProductItem[];
}

ShowCaseTableProduct.defaultProps = {
  list: [],
};

export default function ShowCaseTableProduct(
  props: IShowCaseTableProductProps
) {
  const { list } = props;
  const headList = [
    "Gambar",
    "Produk ID",
    "Produk",
    "Deskripsi",
    "Stok",
    "Kategori",
    "Pilihan Aksi",
  ];
  if (!list.length) {
    return <ProductNotFoundSectionHome />;
  }

  return (
    <table className={"w-full"}>
      <thead>
        <tr className={clsx("pb-[4px] border-b border-b-bright-gray")}>
          {headList.map((item, index) => (
            <th
              key={index}
              className={clsx(
                "h-[6.25rem]",
                item !== "Pilihan Aksi" ? "text-start" : "text-center"
              )}
            >
              <p
                className={clsx("text-[1rem] text-bold text-charleston-green")}
              >
                {item}
              </p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {list?.map((item, index) => {
          return (
            <tr
              key={index}
              className={clsx(
                "text-center",
                index < list.length - 1 &&
                  "pb-[4px] border-b border-b-bright-gray"
              )}
            >
              {Object.keys(item).map((tdKey, tdIndex) => (
                <td
                  key={tdIndex}
                  className={clsx(
                    "h-[6.25rem]",
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

                  {tdKey !== "image" && tdKey !== "action" && (
                    <div
                      className={clsx(
                        "h-[44px] overflow-hidden text-ellipsis",
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

                  {tdKey === "action" && (
                    <div
                      className={clsx(
                        "flex items-center justify-center gap-x-[1rem]"
                      )}
                    >
                      <button>
                        <img src={"/icons/edit-black.svg"} />
                      </button>

                      <button>
                        <img src={"/icons/eye-fill-black.svg"} />
                      </button>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
