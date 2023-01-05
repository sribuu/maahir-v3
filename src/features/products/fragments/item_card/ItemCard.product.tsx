import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { ResellerProductsIdNames } from "../../constants/id_names";

export interface IItemCardProductProps {
  id?: string;
  value?: string;
  name?: string;
  profitValue?: string;
  price?: string;
  productSrc?: string;
  productAlt?: string;
  onClickBuyNow?: (data: number) => void;
  onClickItem?: (data: number) => void;
  onAddToCart?: (data: number) => void;
}

ItemCardProduct.defaultProps = {
  id: "",
  value: "",
  name: "Paket Reseller Setelan Rayon",
  profitValue: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  productSrc: "/images/sample-product.png",
};

export default function ItemCardProduct(props: IItemCardProductProps) {
  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickBuyNow) {
      props.onAddToCart(parseInt(e.currentTarget.value));
    }
  };

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (props.onClickItem) {
      props.onClickItem(parseInt(e.currentTarget.title));
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (props.onAddToCart) {
      props.onAddToCart(parseInt(e.currentTarget.value));
    }
  };

  const isShowProfitValue = props.profitValue !== "Rp0";

  return (
    <div
      id={ResellerProductsIdNames.SeeDetailProduct}
      className={clsx(
        "flex",
        "flex-col gap-[0.625rem] sm:gap-y-[1rem] justify-between",
        "w-full",
        "p-[0.625rem] sm:p-4 rounded-2xl",
        "shadow-1",
        "bg-white",
        "cursor-pointer"
      )}
      title={props.value}
      onClick={handleClickItem}
    >
      <div
        className={clsx(
          "grid",
          "gap-y-[0.625rem] sm:gap-y-[1rem] items-start content-start"
        )}
      >
        <img
          src={props.productSrc}
          loading={"lazy"}
          className={clsx(
            "object-cover rounded-lg",
            "w-[100%] md:w-[176px] h-[104px] sm:h-[132px]"
          )}
        />

        <div className={clsx("grid gap-y-[0.25rem] items-start content-start")}>
          <p className={clsx("text-base text-dark-charcoal font-regular")}>
            {props.name}
          </p>
          <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
            {props.price}
          </p>
        </div>

        {isShowProfitValue && (
          <div className={clsx("flex gap-x-[0.375rem] items-start")}>
            <img
              src={"/icons/verified.svg"}
              width={20}
              height={20}
              loading={"lazy"}
            />
            <p
              className={clsx(
                "text-[0.75rem] font-regular text-independence text-start"
              )}
            >{`Potensi keuntungan mulai dari ${props.profitValue}`}</p>
          </div>
        )}
      </div>

      <div
        className={clsx(
          "flex justify-start items-center",
          "w-full gap-x-[0.625rem]"
        )}
      >
        <ButtonComponent
          id={ResellerProductsIdNames.BuyNow}
          intent={"primary"}
          size={"medium"}
          value={props.value}
          className={clsx("w-full", "hidden sm:inline-flex")}
          onClick={handleClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <button
          id={ResellerProductsIdNames.AddToCart}
          value={props.value}
          className={clsx(
            "hidden sm:flex",
            "bg-white",
            "text-ocean-boat-blue",
            "border-ocean-boat-blue",
            "border",
            "p-[10px]",
            "justify-center items-center",
            "rounded-[0.75rem]"
          )}
          onClick={handleAddToCart}
        >
          <img
            src={"/icons/shopping-cart-blue-plus.svg"}
            className={clsx("w-[1.25rem] h-1.25rem")}
          />
        </button>
      </div>
    </div>
  );
}
