import * as React from "react";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";

export interface IHighlightProductCardHomeProps {
  id?: string;
  name?: string;
  profitValue?: string;
  price?: string;
  advantage?: string;
  productSrc?: string;
  productAlt?: string;
  onClickBuyItem?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickAddToCart?: (data: number) => void;
  onClickItem?: (data: number) => void;
}

HighlightProductCardHome.defaultProps = {
  name: "Paket Reseller Setelan Rayon",
  profitValue: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  advantage: "Potensi keuntungan mulai dari Rp20.000",
  productSrc: "/images/sample-product.png",
};

export default function HighlightProductCardHome(
  props: IHighlightProductCardHomeProps
) {
  const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickAddToCart) {
      props.onClickAddToCart(parseInt(e.currentTarget.id));
    }
  };

  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickBuyItem) {
      props.onClickBuyItem(e);
    }
  };

  const handleClickAddtoCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClickAddToCart) {
      props.onClickAddToCart(parseInt(e.currentTarget.id));
    }
  };
  return (
    <div
      className={clsx(
        "grid gap-y-[1rem] sm:gap-y-[1.25rem] p-[1rem] sm:p-[1.5rem] rounded-2xl shadow-1",
        "bg-white",
        "min-w-[242px]"
      )}
    >
      <button id={props.id} onClick={handleClickItem}>
        <img
          src={props.productSrc}
          loading={"lazy"}
          className={clsx(
            "object-cover rounded-lg",
            "w-[210px] sm:w-[312px] h-[136px] sm:h-[312px]"
          )}
        />
      </button>

      <div className={clsx("grid gap-y-[0.25rem] sm:gap-y-[0.375rem]")}>
        <p
          className={clsx(
            "text-dark-charcoal font-regular",
            "text-[1rem] sm:text-[1.25rem]"
          )}
        >
          {props.name}
        </p>
        <p
          className={clsx(
            "text-ocean-boat-blue font-bold",
            "text-[1rem] sm:text-[1.5rem]"
          )}
        >
          {props.price}
        </p>
      </div>

      <div className={clsx("flex gap-x-[0.375rem] sm:gap-y-[1.25rem]")}>
        <img
          src={"/icons/verified.svg"}
          width={20}
          height={20}
          loading={"lazy"}
        />
        <p
          className={clsx("text-[0.875rem] font-regular text-independence")}
        >{`Potensi keuntungan mulai dari ${props.profitValue}`}</p>
      </div>

      <div
        className={clsx(
          "grid",
          "w-full",
          "grid-cols-[1fr_auto] sm:grid-cols-1",
          "gap-y-[0rem] sm:gap-y-[1.25rem]",
          "gap-x-[0.625rem] sm:gap-x-[0rem]",
          "place-content-center place-items-center"
        )}
      >
        <ButtonComponent
          id={props.id}
          intent={"primary"}
          size={"medium"}
          className={"w-full"}
          onClick={handleClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <ButtonComponent
          className={clsx("hidden sm:flex", "w-full")}
          id={props.id}
          intent={"secondary"}
          size={"medium"}
          onClick={handleClickAddtoCart}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
          {"Keranjang"}
        </ButtonComponent>
        <ButtonComponent
          className={clsx("sm:hidden", "w-full")}
          id={props.id}
          intent={"secondary"}
          size={"medium"}
          onClick={handleClickAddtoCart}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
        </ButtonComponent>
      </div>
    </div>
  );
}
