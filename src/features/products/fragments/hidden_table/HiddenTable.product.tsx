import * as React from "react";
import clsx from "clsx";

export interface IHiddenTableProductProps {}

export default function HiddenTableProduct(props: IHiddenTableProductProps) {
  const headList = [
    "Gambar",
    "Produk ID",
    "Produk",
    "Deskripsi",
    "Stok",
    "Kategori",
    "Pilihan Aksi",
  ];
  const rowList = [
    {
      image:
        "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/segari-logo.png",
      id: "PTLI-001",
      name: "Paket Reseller Parfum Wanita Botol Kaca",
      description:
        "Lorem ipsum dolor sit amet consectetur. Digasdanissim doloyr id adi Digniasssim dolor id adi...",
      stock: 1,
      category: "Kecantikan",
      action: "",
    },
    {
      image:
        "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/segari-logo.png",
      id: "PTLI-001",
      name: "Paket Reseller Beraneka Macam Frozen Food",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dignissim dolor id adi...",
      stock: 100,
      category: "Makanan & Minuman",
      action: "",
    },
  ];
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
        {rowList.map((item, index) => {
          return (
            <tr
              key={index}
              className={clsx(
                "text-center",
                index < rowList.length - 1 &&
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
                        <img src={"/icons/eye-hidden-black.svg"} />
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
