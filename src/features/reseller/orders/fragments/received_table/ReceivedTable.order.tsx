import * as React from "react";
import clsx from "clsx";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";

export interface IReceivedTableOrderProps {}

export default function ReceivedTableOrder(props: IReceivedTableOrderProps) {
  const headList = [
    "Order ID",
    "Produk",
    "Pemesanan",
    "Kurir",
    "Total Harga",
    "Pilihan Aksi",
  ];
  const rowList = [
    {
      order_id: "077325",
      product: [
        {
          name: "Paket Reseller Parfum Wanita Botol Kaca (2pcs)",
          amount: "2",
        },
      ],
      customer: {
        name: "Nina",
        address: "kl. Balai Rakyar no.42 Pondok Bambu, Jakarta Timur 13430",
      },
      courier: "JNE Yes",
      total_price: "Rp349.999",
      action: "",
    },
    {
      order_id: "077325",
      product: [
        {
          name: "Paket Reseller Parfum Wanita Botol Kaca (2pcs)",
          amount: "2",
        },
        {
          name: "Try 2",
          amount: "2",
        },
      ],
      customer: {
        name: "Ilyas",
        address: "kl. Balai Rakyar no.42 Pondok Bambu, Jakarta Timur 13430",
      },
      courier: "JNE Yes",
      total_price: "Rp349.999",
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
                <td key={tdIndex} className={clsx("h-[6.25rem]")}>
                  {tdKey !== "product" &&
                    tdKey !== "customer" &&
                    tdKey !== "action" && (
                      <p
                        className={clsx(
                          "text-[0.875rem] font-regular text-charleston-green text-start"
                        )}
                      >
                        {item[tdKey]}
                      </p>
                    )}

                  {tdKey === "product" && (
                    <div
                      className={clsx(
                        "grid grid-cols-1 justify-start justify-items-start items-center content-center gap-y-[0.25rem]",
                        "max-w-[220px]"
                      )}
                    >
                      <p
                        className={clsx(
                          "text-[0.875rem] font-regular text-charleston-green text-start"
                        )}
                      >
                        {item.product[0].name}
                      </p>
                      {item.product.length > 1 && (
                        <p
                          className={clsx(
                            "text-[0.75rem] font-regular text-taupe-gray text-start"
                          )}
                        >
                          {`+${item.product.length - 1} lainnya`}
                        </p>
                      )}
                    </div>
                  )}

                  {tdKey === "customer" && (
                    <div
                      className={clsx(
                        "grid grid-cols-1 justify-start justify-items-start items-center content-center",
                        "max-w-[220px]"
                      )}
                    >
                      <p
                        className={clsx(
                          "text-[0.875rem] font-regular text-charleston-green text-start"
                        )}
                      >
                        {item.customer.name}
                      </p>

                      <p
                        className={clsx(
                          "text-[0.875rem] font-regular text-charleston-green text-start"
                        )}
                      >
                        {item.customer.address}
                      </p>
                    </div>
                  )}

                  {tdKey === "action" && (
                    <div
                      className={clsx(
                        "flex items-center justify-center gap-x-[0.5rem]"
                      )}
                    >
                      <button
                        className={clsx(
                          "px-[0.625rem] py-[0.5rem] rounded-[0.5rem]",
                          "border border-ocean-boat-blue"
                        )}
                      >
                        <p
                          className={clsx(
                            "text-[0.875rem] font-bold text-ocean-boat-blue"
                          )}
                        >
                          {"Terima"}
                        </p>
                      </button>

                      <p
                        className={clsx(
                          "text-[0.875rem] font-bold text-tart-orange"
                        )}
                      >
                        {"Tolak"}
                      </p>
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
