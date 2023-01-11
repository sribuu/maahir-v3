import { useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { RouterPathName } from "@/src/core/lib/constants";
import { useMyCartSetShipment } from "../../hooks/useSetShipment.cart";

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
  const { state } = useContext(ResellerMyCartContext);
  const { mutate: setShipment } = useMyCartSetShipment();
  // const { mutate: mutateOrderItem, isSuccess: isSuccessMutateOrderItem } =
  //   useMutateOrderProduct();

  const handleSelectPaymentMethod = () => {
    setShipment();
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

  const totalQuantity =
    state.cart.items.length + state.cart.unavailable_items.length;
  const cartIsNotEmpty = totalQuantity > 0;

  const totalSelectedQuantity = state.cart.items
    .filter((item) => item.selected)
    .reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

  const totalSelectedPrice = thousandSeparator(
    state.cart.items
      .filter((item) => item.selected)
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0)
  );

  const selectedItems = state.cart.items.filter((item) => item.selected);

  return (
    <div
      className={clsx(
        "grid gap-y-[1.5rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <p
        className={clsx(
          "text-[1rem] sm:text-[1.25rem] text-charleston-green font-bold"
        )}
      >
        {props.title}
      </p>

      {/* item */}
      {cartIsNotEmpty && (
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.25rem]",
            "w-full"
          )}
        >
          {selectedItems.map((item, index) => (
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
                    "text-[0.875rem] text-charleston-green font-bold"
                  )}
                >
                  {item.product_name}
                </p>
                <p
                  className={clsx(
                    "text-[0.875rem] text-charleston-green font-regular"
                  )}
                >
                  {item.quantity} {"barang"}
                </p>
              </div>
              <p
                className={clsx("text-[1rem] text-charleston-green font-bold")}
              >
                {thousandSeparator(item.price)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* end item */}

      {/* divider */}
      {selectedItems.length > 0 && <DividerComponent />}

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
          <p
            className={clsx(
              "text-[0.875rem]",
              "text-charleston-green",
              "font-bold"
            )}
          >
            {"Total Harga"}
          </p>
          <p
            className={clsx(
              "text-[0.75rem] sm:text-[0.875rem]",
              "text-charleston-green",
              "font-regular"
            )}
          >
            {/* {"6 items"} */}
            {`${totalSelectedQuantity} barang`}
          </p>
        </div>
        <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {/* {thousandSeparator(totalSelectedPrice)} */}
          {totalSelectedPrice}
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
          {/* {thousandSeparator(totalSelectedPrice)} */}
          {totalSelectedPrice}
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
          disabled={false}
          onClick={handleSelectPaymentMethod}
        >
          {"Beli Sekarang"}
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
