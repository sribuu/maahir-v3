import * as React from "react";
import clsx from "clsx";
import { ISupplierProductItem } from "../../models";
import ProductNotFoundSectionHome from "../../../products/fragments/product_not_found_section/ProductNotFoundSection";
import PencilIcon from "@/src/core/ui/icons/pencil/Pencil.icon";
import ShowIcon from "@/src/core/ui/icons/show/Show.icon";
import { useMutateChangeSupplierProductShowQuery } from "../../hooks/useChangeSupplierProductShow";
export interface IHiddenTableProductProps {
  list?: ISupplierProductItem[];
}

HiddenTableProduct.defaultProps = {
  list: [],
};

export default function HiddenTableProduct(props: IHiddenTableProductProps) {
  const { list } = props;
  const { mutate: mutateShowProduct } =
    useMutateChangeSupplierProductShowQuery();
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

  const handleClickShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutateShowProduct({ id: parseInt(e.currentTarget.id) });
  };
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
        {list.map((item, index) => {
          return (
            <tr
              key={index}
              className={clsx(
                "text-center",
                "bg-white hover:bg-ghost-white",
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

                  {tdKey === "action" && (
                    <div
                      className={clsx(
                        "flex items-center justify-center gap-x-[1rem]"
                      )}
                    >
                      <button>
                        <PencilIcon
                          className={clsx(
                            "w-[1.5rem] h-[1.5rem]",
                            "fill-charleston-green hover:fill-ocean-boat-blue"
                          )}
                        />
                      </button>

                      <button id={String(item.id)} onClick={handleClickShow}>
                        <ShowIcon
                          className={clsx(
                            "w-[1.5rem] h-[1.5rem]",
                            "fill-charleston-green hover:fill-ocean-boat-blue"
                          )}
                        />
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
