import { useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { v4 as uuid } from "uuid";
import { RouterPathName } from "@/src/core/lib/constants";

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

  const totalQuantity: number = state.cart.items?.reduce((acc, item) => {
    const supplierItemTotal = item?.supplier?.data.reduce(
      (accSupplierItem, supplierItem) => {
        accSupplierItem = supplierItem.quantity + accSupplierItem;
        return accSupplierItem;
      },
      0
    );
    return acc + supplierItemTotal;
  }, 0);

  const cartIsNotEmpty = totalQuantity > 0;

  const totalSelectedQuantity: number = state.cart.items?.reduce(
    (acc, item) => {
      const supplierItemTotal = item?.supplier?.data.reduce(
        (accSupplierItem, supplierItem) => {
          accSupplierItem = supplierItem.selected
            ? supplierItem.quantity + accSupplierItem
            : accSupplierItem;
          return accSupplierItem;
        },
        0
      );
      return acc + supplierItemTotal;
    },
    0
  );

  const totalSelectedPrice: number = state.cart.items?.reduce((acc, item) => {
    const supplierItemTotal = item?.supplier?.data.reduce(
      (accSupplierItem, supplierItem) => {
        accSupplierItem = supplierItem.selected
          ? supplierItem.price + accSupplierItem
          : accSupplierItem;
        return accSupplierItem;
      },
      0
    );
    return acc + supplierItemTotal;
  }, 0);

  const selectedItems = state.cart.items
    .map((item) =>
      item.supplier.data.filter((supplierItem) => supplierItem.selected)
    )
    .flat(1);

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
          {thousandSeparator(totalSelectedPrice)}
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
          {thousandSeparator(totalSelectedPrice)}
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
