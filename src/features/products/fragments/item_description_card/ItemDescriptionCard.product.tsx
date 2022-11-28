import * as React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IItemDescriptionCardProductProps {
  id?: string;
  name?: string;
  category?: string;
  price?: string;
  description?: string;
  profitValue?: string;
  minPrice?: string;
  maxPrice?: string;
  itemNumber?: number;
  onAddToCart?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddItemNumber?: (data: number) => void;
  onSubstractItemNumber?: (data: number) => void;
}
ItemDescriptionCardProduct.defaultProps = {
  name: "Paket Reseller Parfum Wanita Botol Kaca",
  category: "Kecantikan",
  price: "Rp49.999",
  description:
    "Lorem ipsum dolor sit amet consectetur. Dignissim dolor id adipiscing fermentum sed non ut. Parturient pellentesque dolor egestas lacinia ut sit sodales etiam duis. In ultrices aenean at massa. Urna id sollicitudin mi aliquam. Natoque fringilla elit egestas adipiscing gravida nisi purus eleifend erat. Erat enim dictumst sodales eget in a sit fusce. Pellentesque imperdiet diam nunc felis placerat arcu. Sodales purus porta nisl urna nibh diam at.",
  profitValue: "Rp49.999",
  minPrice: "Rp8.000",
  maxPrice: "Rp10.000",
  id: "",
  itemNumber: 0,
};

export default function ItemDescriptionCardProduct(
  props: IItemDescriptionCardProductProps
) {
  return (
    <div
      className={clsx(
        "grid gap-y-[2rem] items-start content-start",
        "p-6 rounded-[1rem] border max-w-[532px] box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid gap-y-[1rem] grid-cols-1")}>
        <div className={clsx("grid gap-y-[0.5rem] grid-cols-1")}>
          <p className={clsx("text-[1.75rem] text-dark-charcoal font-regular")}>
            {props.name}
          </p>
          <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
            {"Kategori: "}
            <span
              className={clsx("text-[1rem] text-charleston-green font-regular")}
            >
              {props.category}
            </span>
          </p>
        </div>

        {/* price */}
        <p className={clsx("text-[2.25rem] text-dark-charcoal font-regular")}>
          {props.price}
        </p>
        <p className={clsx("text-[1rem] text-independence font-regular")}>
          {props.description}
        </p>
      </div>

      {/* label */}
      <div className={clsx("grid gap-y-[0.75rem] grid-cols-1")}>
        {/* unit item */}
        <div className={clsx("flex gap-x-[0.375rem] items-center")}>
          <img
            src={"/icons/shopping-tag.svg"}
            width={20}
            height={20}
            loading={"lazy"}
          />
          <p
            className={clsx(
              "text-[1rem] font-regular text-taupe-gray text-start"
            )}
          >{`Harga jual satuan ${props.minPrice} - ${props.maxPrice}`}</p>
        </div>
        {/* profit */}
        <div className={clsx("flex gap-x-[0.375rem] items-center")}>
          <img
            src={"/icons/verified.svg"}
            width={20}
            height={20}
            loading={"lazy"}
          />
          <p
            className={clsx(
              "text-[1rem] font-regular text-taupe-gray text-start"
            )}
          >{`Potensi keuntungan mulai dari ${props.profitValue}`}</p>
        </div>
      </div>

      {/* counter */}
      <div className={clsx("flex gap-x-[1.25rem] items-center")}>
        <p
          className={clsx(
            "text-[1rem] font-regular text-charleston-green text-start"
          )}
        >{`Jumlah : `}</p>

        <CounterComponent
          quantity={props.itemNumber}
          onSummation={props.onAddItemNumber}
          onSubstract={props.onSubstractItemNumber}
        />
      </div>
      {/* actions */}
      <div className={clsx("flex gap-x-[1rem] items-center")}>
        <ButtonComponent
          id={props.id}
          intent={"primary"}
          size={"medium"}
          className={"w-full"}
          //   onClick={handleClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <ButtonComponent
          id={props.id}
          intent={"secondary"}
          size={"medium"}
          className={"w-full"}
          onClick={props.onAddToCart}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
          {"Keranjang"}
        </ButtonComponent>
      </div>
    </div>
  );
}
