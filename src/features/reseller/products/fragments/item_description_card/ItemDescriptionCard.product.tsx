import { useRouter } from "next/router";
import { useContext } from "react";
import clsx from "clsx";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import AvailableStockProduct from "../available_stock/AvailableStock.product";
import AvailableVariantProduct from "../available_variant/AvailableVariant.product";
import AvatarComponent from "@/src/core/ui/components/avatar/Avatar.component";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import { ProductContext } from "../../contexts/product/Product.context";
import { ProductActionEnum } from "../../contexts/product/Product.types";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import { useProductAddItemToCart } from "../../hooks/useProductSaveCart";

export interface IItemDescriptionCardProductProps {
  onAddToCart?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddItemNumber?: (data: number) => void;
  onSubstractItemNumber?: (data: number) => void;
}
ItemDescriptionCardProduct.defaultProps = {};

export default function ItemDescriptionCardProduct(
  props: IItemDescriptionCardProductProps
) {
  const router = useRouter();
  const { state, dispatch } = useContext(ProductContext);
  const { mutate: addItemToCart } = useProductAddItemToCart();

  const handleSumItem = () => {
    dispatch({
      type: ProductActionEnum.AddQuantity,
    });
  };

  const handleSubstractItem = () => {
    dispatch({
      type: ProductActionEnum.SubstractQuantity,
    });
  };

  const handleSelectVariant = (data: string) => {
    dispatch({
      type: ProductActionEnum.ChangeVariant,
      payload: data,
    });
  };

  const handleClickBuyNow = () => {
    router.replace({
      pathname: RouterPathName.OrderProduct,
      query: {
        [RouterQueryKey.ProductId]: parseInt(
          String(router.query[RouterQueryKey.ProductId])
        ),
      },
    });
  };

  const handleClickAddToCart = () => {
    addItemToCart();
  };

  return (
    <div
      className={clsx(
        "hidden sm:grid",
        "grid gap-y-[2rem] items-start content-start",
        "p-6 rounded-[1rem] border max-w-[532px] box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid gap-y-[1rem] grid-cols-1")}>
        <div className={clsx("grid gap-y-[0.5rem] grid-cols-1")}>
          <p className={clsx("text-[1.75rem] text-dark-charcoal font-regular")}>
            {state.detail.name}
          </p>
          <p
            className={clsx(
              "hidden sm:block",
              "text-[1rem] text-taupe-gray font-regular"
            )}
          >
            {"Kategori: "}
            <span
              className={clsx("text-[1rem] text-charleston-green font-regular")}
            >
              {state.detail.category}
            </span>
          </p>
        </div>

        {/* price */}
        <p
          className={clsx(
            "hidden sm:block",
            "text-[2.25rem] text-dark-charcoal font-regular"
          )}
        >
          {state.detail.variant.price.selected}
        </p>
        <p className={clsx("text-[1rem] text-independence font-regular")}>
          {state.detail.description}
        </p>
      </div>

      {/* label */}
      <div className={clsx("grid gap-y-[0.75rem] grid-cols-1")}>
        {/* unit item */}
        {state.detail.profit !== "Rp0" && (
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
            >
              {`Harga jual satuan ${state.detail.min_price} - ${state.detail.max_price}`}
            </p>
          </div>
        )}

        {/* profit */}
        {state.detail.profit !== "Rp0" && (
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
            >
              {`Potensi keuntungan mulai dari ${state.detail.profit}`}
            </p>
          </div>
        )}
      </div>

      <AvailableVariantProduct
        selected={state.detail.variant.name.selected}
        variants={state.detail.variant.name.list}
        onSelect={handleSelectVariant}
      />

      {/* counter */}
      <div className={clsx("flex gap-x-[1.25rem] items-center")}>
        <p
          className={clsx(
            "text-[1rem] font-regular text-charleston-green text-start"
          )}
        >{`Jumlah : `}</p>

        <div
          className={clsx("flex justify-start items-center gap-x-[0.75rem]")}
        >
          <CounterComponent
            quantity={state.detail.quantity}
            onSummation={handleSumItem}
            onSubstract={handleSubstractItem}
          />
          <AvailableStockProduct stock={state.detail.variant.stock.selected} />
        </div>
      </div>

      {/* actions */}
      <div className={clsx("flex gap-x-[1rem] items-center")}>
        <ButtonComponent
          id={String(state.detail.id)}
          intent={"primary"}
          size={"medium"}
          className={"w-full"}
          onClick={handleClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <ButtonComponent
          id={String(state.detail.id)}
          intent={"secondary"}
          size={"medium"}
          className={"w-full"}
          onClick={handleClickAddToCart}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
          {"Keranjang"}
        </ButtonComponent>
      </div>
    </div>
  );
}
