import { useRouter } from "next/router";
import clsx from "clsx";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { RouterPathName } from "@/src/core/lib/constants";

export interface IShoppingSummaryCardBuyProps {
  id?: string;
  title?: string;
  totalQuantity?: string;
  totalPrice?: string;
  totalPayment?: string;
}

ShoppingSummaryCardBuy.defaultProps = {
  title: "Ringkasan Belanja",
  id: "",
  quantity: "",
  totalPrice: "-",
  totalPayment: "-",
};

export default function ShoppingSummaryCardBuy(
  props: IShoppingSummaryCardBuyProps
) {
  const router = useRouter();

  const handleClickBuy = () => {
    //
  };

  const handleClickCancel = () => {
    router.push(RouterPathName.AllProducts);
  };

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
            {props.totalQuantity}
          </p>
        </div>
        <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {props.totalPrice}
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
          {props.totalPayment}
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
          onClick={handleClickBuy}
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
