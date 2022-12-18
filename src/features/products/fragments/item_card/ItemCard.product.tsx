import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IItemCardProductProps {
  id?: string;
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
  name: "Paket Reseller Setelan Rayon",
  profitValue: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  productSrc: "/images/sample-product.png",
};

export default function ItemCardProduct(props: IItemCardProductProps) {
  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickBuyNow) {
      props.onAddToCart(parseInt(e.currentTarget.id));
    }
  };
  const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickItem) {
      props.onClickItem(parseInt(e.currentTarget.id));
    }
  };
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onAddToCart) {
      props.onAddToCart(parseInt(e.currentTarget.id));
    }
  };

  return (
    <div
      className={clsx(
        "grid",
        "gap-y-[0.625rem] sm:gap-y-[1rem] p-[0.625rem] sm:p-4 rounded-2xl shadow-1",
        "bg-white",
        "cursor-pointer"
      )}
    >
      <button id={props.id} onClick={handleClickItem}>
        <img
          src={props.productSrc}
          loading={"lazy"}
          className={clsx(
            "object-cover rounded-lg",
            "w-[100%] md:w-[176px] h-[104px] sm:h-[132px]"
          )}
        />
      </button>

      <div className={clsx("grid gap-y-[0.25rem]")}>
        <p className={clsx("text-base text-dark-charcoal font-regular")}>
          {props.name}
        </p>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.price}
        </p>
      </div>

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

      <div
        className={clsx(
          "flex justify-start items-center",
          "w-full gap-x-[0.625rem]"
        )}
      >
        <ButtonComponent
          id={props.id}
          intent={"primary"}
          size={"medium"}
          className={clsx("w-full", "hidden sm:inline-flex")}
          onClick={handleClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <button
          id={props.id}
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
