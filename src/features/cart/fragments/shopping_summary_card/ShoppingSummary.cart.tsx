import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { CartContext } from "../../contexts/cart/Cart.context";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { useMutateOrderProduct } from "@/src/features/orders/hooks/useOrderItem";
import { v4 as uuid } from "uuid";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
export interface IShoppingSummaryCardCartProps {
  id?: string;
  title?: string;
}

ShoppingSummaryCardCart.defaultProps = {
  title: "Ringkasan Belanja",
  id: "",
};

export default function ShoppingSummaryCardCart(
  props: IShoppingSummaryCardCartProps
) {
  const router = useRouter();
  const { state } = useContext(CartContext);
  // const { mutate: mutateOrderItem, isSuccess: isSuccessMutateOrderItem } =
  //   useMutateOrderProduct();

  const orderId = String(uuid());
  const handleSelectPaymentMethod = () => {
    // mutateOrderItem({
    //   order_id: orderId,
    //   orders: state.cart.items
    //     .filter((item) => state.cart.selected_items.includes(item.id))
    //     .map((item) => {
    //       return {
    //         name: item.title,
    //         product_id: item.id,
    //         quantity: item.amount,
    //         notes: item.note,
    //         price: item.price,
    //         image: item.image,
    //       };
    //     }),
    // });
  };

  const handleClickCancel = () => {
    //
    router.push(RouterPathName.AllProducts);
  };
  // useEffect(() => {
  //   if (isSuccessMutateOrderItem) {
  //     router.replace({
  //       pathname: RouterPathName.FillOrderDetail,
  //       query: {
  //         [RouterQueryKey.ProductId]: orderId,
  //       },
  //     });
  //   }
  // }, [isSuccessMutateOrderItem]);
  return (
    <div
      className={clsx(
        "grid gap-y-[1.5rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <p className={clsx("text-[1.25rem] text-charleston-green font-regular")}>
        {props.title}
      </p>

      {/* item */}
      {state.cart.items.filter((item) =>
        state.cart.selected_items.includes(item.id)
      ).length > 0 && (
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.25rem]",
            "w-full"
          )}
        >
          {state.cart.items
            .filter((item) => state.cart.selected_items.includes(item.id))
            .map((item, index) => (
              <div
                key={String(index)}
                className={clsx(
                  "flex gap-x-[1.25rem] justify-between items-center",
                  "w-full"
                )}
              >
                <div
                  className={clsx(
                    "grid gap-y-[0.125rem] grid-cols-1 items-start content-start"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[1rem] text-charleston-green font-bold"
                    )}
                  >
                    {item.title}
                  </p>
                  <p
                    className={clsx(
                      "text-[0.875rem] text-charleston-green font-regular"
                    )}
                  >
                    {"Qty: "}
                    <span
                      className={clsx(
                        "text-[0.875rem] text-charleston-green font-regular"
                      )}
                    >
                      {item.amount > 1
                        ? `${item.amount} items`
                        : `${item.amount} item`}
                    </span>
                  </p>
                </div>
                <p
                  className={clsx(
                    "text-[1rem] text-charleston-green font-bold"
                  )}
                >
                  {thousandSeparator(item.price)}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* end item */}

      {/* divider */}
      {state.cart.items.filter((item) =>
        state.cart.selected_items.includes(item.id)
      ).length > 0 && <DividerComponent />}

      {/* end divider */}

      {/* total price */}
      <div
        className={clsx(
          "flex gap-x-[1.25rem] justify-between items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid gap-y-[0.125rem] grid-cols-1 items-start content-start"
          )}
        >
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {"Total Harga"}
          </p>
          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {/* {"6 items"} */}
            {`${state.cart.items
              .filter((item) => state.cart.selected_items.includes(item.id))
              .reduce((acc, item) => acc + item.amount, 0)} ${
              state.cart.items
                .filter((item) => state.cart.selected_items.includes(item.id))
                .reduce((acc, item) => acc + item.amount, 0) > 1
                ? "items"
                : "item"
            }`}
          </p>
        </div>
        <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {/* {"Rp2.297.996"} */}
          {thousandSeparator(
            state.cart.items
              .filter((item) => state.cart.selected_items.includes(item.id))
              .reduce((acc, item) => acc + item.price * item.amount, 0)
          )}
        </p>
      </div>
      {/* end total price */}

      {/* divider */}
      <DividerComponent />
      {/* end divider */}

      {/* total payment */}
      <div
        className={clsx(
          "flex gap-x-[1.25rem] justify-between items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid gap-y-[0.125rem] grid-cols-1 items-start content-start"
          )}
        >
          <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
            {"Total Pembayaran"}
          </p>
        </div>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {/* {"Rp2.297.996"} */}
          {thousandSeparator(
            state.cart.items
              .filter((item) => state.cart.selected_items.includes(item.id))
              .reduce((acc, item) => acc + item.price * item.amount, 0)
          )}
        </p>
      </div>

      {/* end total payment */}
      {/* actions button */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem] place-content-start place-items-start"
        )}
      >
        <ButtonComponent
          id={props.id}
          intent={"primary"}
          size={"large"}
          className={"w-full"}
          disabled={!state.cart.selected_items.length}
          onClick={handleSelectPaymentMethod}
        >
          {"Pilih Metode Pembayaran"}
        </ButtonComponent>

        <ButtonComponent
          id={props.id}
          intent={"secondary"}
          size={"large"}
          className={"w-full"}
          onClick={handleClickCancel}
        >
          <img src={"/icons/add-to-cart-blue.svg"} />
          {"Batalkan"}
        </ButtonComponent>
      </div>
    </div>
  );
}
