import * as React from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import { ICart } from "@/src/core/lib/models";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { fetchCartItem } from "@/src/core/lib/storage";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IListItemCardCartProps {
  category?: string;
  name?: string;
  price?: string;
  productSrc?: string;
  onChangeNotes?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}
ListItemCardCart.defaultProps = {
  category: "Kecantikan",
  name: "Paket Reseller Parfum Wanita Botol Kaca",
  price: "Rp49.999",
  productSrc: "/images/sample-product.png",
};
export default function ListItemCardCart(props: IListItemCardCartProps) {
  const {
    data: cartData,
    isLoading: isLoadingCartData,
    isSuccess: isSuccessCartData,
  } = useQuery<ICart[]>({
    queryKey: [ReactQueryKey.GetCart],
    queryFn: fetchCartItem,
    enabled: typeof window !== "undefined",
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
  };

  return (
    <div
      className={clsx(
        "grid gap-y-[2rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border max-w-[1200px] w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid grid-cols-1", "gap-y-[1.25rem] w-full")}>
        <CheckboxComponent
          name={"Pilih Semua"}
          checked={false}
          onChange={handleSelectAll}
        />

        <hr className={clsx("border border-bright-gray")} />

        {isSuccessCartData &&
          cartData.map((item) => (
            <div className={clsx("flex gap-x-[1.25rem] w-full")}>
              <CheckboxComponent />
              <img
                src={item.image}
                width={126}
                className={clsx(
                  "object-cover",
                  "w-[126px] h-[150px]",
                  "rounded-[0.5rem]"
                )}
              />

              {/* description */}
              <div
                className={clsx(
                  "grid gap-y-[0.75rem] grid-cols-1 items-start content-start"
                )}
              >
                <div
                  className={clsx(
                    "grid gap-y-[0rem] grid-cols-1 items-start content-start"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[0.75rem] text-taupe-gray font-regular"
                    )}
                  >
                    {props.category}
                  </p>
                  <p
                    className={clsx(
                      "text-[1rem] text-dark-charcoal font-regular"
                    )}
                  >
                    {item.title}
                  </p>
                </div>
                <p
                  className={clsx(
                    "text-[1.75rem] text-dark-charcoal font-bold"
                  )}
                >
                  {thousandSeparator(item.price)}
                </p>

                {/* notes */}
                <p
                  className={clsx(
                    "text-[0.75rem] text-taupe-gray font-regular"
                  )}
                >
                  {
                    "Mohon diisi untuk memilih varian atau mengirimkan catatan lainnya ke penjual"
                  }
                </p>

                <input
                  className={clsx(
                    "w-full",
                    "bg-white bg-opacity-0 outline-0",
                    "border border-gainsboro",
                    "rounded-[0.5rem]",
                    "py-[0.375rem] px-[0.875rem]",
                    "text-independence font-regular text-[0.75rem]",
                    "placeholder:text-taupe-gray placeholder:text-[0.75rem] placeholder:font-regular",
                    "hover: border hover:border-ocean-boat-blue",
                    "focus: border focus:border-ocean-boat-blue"
                  )}
                  placeholder={"Tulis Catatan Disini"}
                  onChange={props.onChangeNotes}
                />
              </div>

              <CounterComponent quantity={item.amount} />
            </div>
          ))}
      </div>
    </div>
  );
}
