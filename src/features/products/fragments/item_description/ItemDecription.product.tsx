import { useContext } from "react";
import { useRouter } from "next/router";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import AvailableStockProduct from "../available_stock/AvailableStock.product";
import clsx from "clsx";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import AvailableVariantProduct from "../available_variant/AvailableVariant.product";
import { useProductAddItemToCart } from "../../hooks/useProductCart";
import { ProductContext } from "../../contexts/product/Product.context";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import { ProductActionEnum } from "../../contexts/product/Product.types";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import AvatarComponent from "@/src/core/ui/components/avatar/Avatar.component";

export interface IItemDescriptionProductProps {}

export default function ItemDescriptionProduct(
  props: IItemDescriptionProductProps
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
        "grid sm:hidden",
        "grid-cols-1 gap-y-[0.75rem]",
        "w-full",
        "px-[1rem]"
      )}
    >
      <div className={clsx("grid gap-y-[0.75rem] grid-cols-1")}>
        {/* top */}
        <div className={clsx("grid gap-y-[0.625rem] grid-cols-1", "w-full")}>
          <div className={clsx("flex items-center justify-between", "w-full")}>
            <p className={clsx("text-[1rem] text-dark-charcoal font-bold")}>
              {state.detail.variant.price.selected}
            </p>

            <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
              {"Kategori: "}
              <span
                className={clsx(
                  "text-[1rem] text-charleston-green font-regular"
                )}
              >
                {state.detail.category}
              </span>
            </p>
          </div>

          <div className={clsx("grid gap-y-[0.5rem] grid-cols-1")}>
            <p
              className={clsx("text-[1.75rem] text-dark-charcoal font-regular")}
            >
              {state.detail.name}
            </p>
          </div>

          <AvailableVariantProduct
            selected={state.detail.variant.name.selected}
            variants={state.detail.variant.name.list}
            onSelect={handleSelectVariant}
          />
        </div>

        <p className={clsx("text-[1rem] text-independence font-regular")}>
          {state.detail.description}
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
              "text-[0.75rem] sm:text-[1rem]",
              "font-regular text-taupe-gray text-start"
            )}
          >
            {`Harga jual satuan ${state.detail.min_price} - ${state.detail.max_price}`}
          </p>
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
              "text-[0.75rem] sm:text-[1rem]",
              "font-regular text-taupe-gray text-start"
            )}
          >
            {`Potensi keuntungan mulai dari ${state.detail.profit}`}
          </p>
        </div>
      </div>

      {/* counter */}
      <div
        className={clsx(
          "flex gap-x-[1.25rem] items-center justify-between sm:justify-start",
          "h-[44px] sm:h-auto",
          "w-full"
        )}
      >
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
      <DividerComponent />
      {/* supplier */}
      <div className={clsx("flex items-center justify-start gap-x-[1rem]")}>
        <AvatarComponent text={state.supplier.initial} />
        <div
          className={clsx(
            "grid grid-cols-1 justify-start justify-items-start gap-y-[0.125rem]"
          )}
        >
          <p
            className={clsx(
              "text-[0.875rem] font-bold text-charleston-green text-start"
            )}
          >
            {state.supplier.name}
          </p>
          <p
            className={clsx(
              "text-[0.75rem] font-regular text-charleston-green text-start"
            )}
          >
            {state.supplier.location}
          </p>
        </div>
      </div>
      {/* actions */}
      <div className={clsx("flex gap-x-[1rem] items-center")}>
        <ButtonComponent
          id={String(state.detail.id)}
          intent={"primary"}
          size={"large"}
          className={"w-full"}
          onClick={handleClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <ButtonComponent
          id={String(state.detail.id)}
          intent={"secondary"}
          size={"large"}
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
