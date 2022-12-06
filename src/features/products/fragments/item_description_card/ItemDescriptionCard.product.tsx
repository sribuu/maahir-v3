import { useContext } from "react";
import clsx from "clsx";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import AvailableStockProduct from "../available_stock/AvailableStock.product";
import AvailableVariantProduct from "../available_variant/AvailableVariant.product";
import { ProductContext } from "../../contexts/product/Product.context";
import { Types } from "@/src/features/products/contexts/product/Product.reducers";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IItemDescriptionCardProductProps {
  onAddToCart?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddItemNumber?: (data: number) => void;
  onSubstractItemNumber?: (data: number) => void;
}
ItemDescriptionCardProduct.defaultProps = {};

export default function ItemDescriptionCardProduct(
  props: IItemDescriptionCardProductProps
) {
  const { state, dispatch, onClickBuyNow, onAddToCart } =
    useContext(ProductContext);

  const handleSumItem = () => {
    dispatch({
      type: Types.AddQuantity,
    });
  };
  const handleSubstractItem = () => {
    dispatch({
      type: Types.SubstractQuantity,
    });
  };

  const handleSelectVariant = (data: string) => {
    dispatch({
      type: Types.SelectVariant,
      payload: data,
    });
  };

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
            {state.products.title}
          </p>
          <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
            {"Kategori: "}
            <span
              className={clsx("text-[1rem] text-charleston-green font-regular")}
            >
              {state.products.category_name}
            </span>
          </p>
        </div>

        {/* price */}
        <p className={clsx("text-[2.25rem] text-dark-charcoal font-regular")}>
          {thousandSeparator(state.products.price)}
        </p>
        <p className={clsx("text-[1rem] text-independence font-regular")}>
          {state.products.description}
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
          >
            {`Harga jual satuan ${thousandSeparator(
              state.products.retail_price_min
            )} - ${thousandSeparator(state.products.retail_price_max)}`}
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
              "text-[1rem] font-regular text-taupe-gray text-start"
            )}
          >
            {`Potensi keuntungan mulai dari ${thousandSeparator(
              state.products.profit_value
            )}`}
          </p>
        </div>
      </div>

      <AvailableVariantProduct
        selected={state.variant}
        variants={state.variants}
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
            quantity={state.quantity}
            onSummation={handleSumItem}
            onSubstract={handleSubstractItem}
          />
          <AvailableStockProduct stock={state.products.stock} />
        </div>
      </div>
      {/* actions */}
      <div className={clsx("flex gap-x-[1rem] items-center")}>
        <ButtonComponent
          id={String(state.products.id)}
          intent={"primary"}
          size={"medium"}
          className={"w-full"}
          onClick={onClickBuyNow}
        >
          {"Beli Sekarang"}
        </ButtonComponent>

        <ButtonComponent
          id={String(state.products.id)}
          intent={"secondary"}
          size={"medium"}
          className={"w-full"}
          onClick={onAddToCart}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
          {"Keranjang"}
        </ButtonComponent>
      </div>
    </div>
  );
}
