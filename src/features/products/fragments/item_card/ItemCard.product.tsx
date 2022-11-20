import * as React from "react";
import clsx from "clsx";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ButtonComponent from "../../../../core/ui/components/button/Button.component";
import { fetchAddToCart } from "@/src/core/lib/storage";
import { ICart, IProducts } from "@/src/core/lib/models";
import { ReactQueryKey } from "@/src/core/lib/constants";

export interface IItemCardProductProps {
  id?: string;
  name?: string;
  profitValue?: string;
  price?: string;
  productSrc?: string;
  productAlt?: string;
  data: IProducts;
  productRef?: (node?: Element) => void;
  onClickBuyNow?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickItem?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddToCart?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

ItemCardProduct.defaultProps = {
  id: "",
  name: "Paket Reseller Setelan Rayon",
  profitValue: "Potensi keuntungan mulai dari Rp20.000",
  price: "Rp49.999",
  productSrc: "/images/sample-product.png",
};

export default function ItemCardProduct(props: IItemCardProductProps) {
  const queryClient = useQueryClient();
  const {
    data: addToCartData,
    isSuccess: isSuccessAddToCart,
    isLoading: isLoadingAddToCart,
    mutate: mutateAddToCart,
  } = useMutation<ICart[], unknown, ICart, unknown>({
    mutationFn: (data: ICart) => {
      return fetchAddToCart(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([ReactQueryKey.AddCart], data);
    },
  });
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const payload: ICart = { ...props.data, amount: 1 };

    mutateAddToCart(payload);
  };

  return (
    <div
      ref={props.productRef}
      className={clsx(
        "grid",
        "gap-y-[1rem] p-4 rounded-2xl shadow-1",
        "bg-white",
        "cursor-pointer"
      )}
    >
      <button id={props.id} onClick={props.onClickItem}>
        <img
          src={props.productSrc}
          width={244}
          height={180}
          loading={"lazy"}
          className={clsx("object-cover rounded-lg w-[176px] h-[132px]")}
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
          className={"w-full"}
          onClick={props.onClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <button
          id={props.id}
          className={clsx(
            "bg-white",
            "text-ocean-boat-blue",
            "border-ocean-boat-blue",
            "border",
            "p-[10px]",
            "flex justify-center items-center",
            "rounded-[0.75rem]"
          )}
          onClick={handleAddToCart}
        >
          <img
            src={"/icons/shopping-cart-blue.svg"}
            className={clsx("w-[1.25rem] h-1.25rem")}
          />
        </button>
      </div>
    </div>
  );
}
