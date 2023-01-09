import * as React from "react";
import clsx from "clsx";

export interface ICheckOrderCardOrderProps {
  orderId?: string;
  orderDate?: string;
  name?: string;
  productImage?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
  quantity?: number;
  orderStatus?: string;
  statusIcon?: string;
  statusColor?: string;
}

CheckOrderCardOrder.defaultProps = {
  orderId: "ID077325",
  orderDate: "26 Oktober 2022 - 22:12 WIB",
  name: "Paket Reseller Parfum",
  productImage: "",
  statusIcon: "",
  price: "Rp177.997",
  minPrice: "Rp 8.000",
  maxPrice: "10.000",
  quantity: 0,
  orderStatus: "Menunggu Pembayaran",
  statusColor: "dark-charcoal",
};

export default function CheckOrderCardOrder(props: ICheckOrderCardOrderProps) {
  const description: string = `Harga jual satuan ${props.minPrice} - ${props.maxPrice}`;
  const quantity = `Qty: ${props.quantity} ${
    props.quantity > 1 ? "items" : "item"
  }`;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 w-full",
        "gap-x-6 p-6 rounded-2xl w-full",
        "bg-white shadow-2"
      )}
    >
      {/* header */}
      <div
        className={clsx(
          "flex justify-between items-center",
          "p-x-[1.5rem] p-y-[1.25rem]",
          "border-b border-b-bright-gray"
        )}
      >
        <p className={clsx("text-[1.5rem] text-charleston-green font-bold")}>
          {props.orderId}
        </p>

        <p className={clsx("text-base text-independence font-regular")}>
          {props.orderDate}
        </p>
      </div>
      {/* body */}
      <div
        className={clsx(
          "flex justify-between items-center",
          "p-x-[1.5rem] p-y-[1.25rem]",
          "border-b border-b-bright-gray"
        )}
      >
        <div
          className={clsx("flex justify-start items-center", "gap-x-[2rem]")}
        >
          <img
            src={props.productImage}
            className={clsx("w-[17.25rem] h-[12.75rem] rounded-[0.75rem]")}
          />
          {/* information */}
          <div className={clsx("grid grid-cols-1", "w-fit gap-y-[1rem]")}>
            <div className={clsx("grid grid-cols-1", "w-fit gap-y-[0.5rem]")}>
              <div
                className={clsx("grid grid-cols-1", "w-fit gap-y-[0.125rem]")}
              >
                <p
                  className={clsx(
                    "text-[1.75rem] text-dark-charcoal font-regular"
                  )}
                >
                  {props.name}
                </p>
                <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
                  {description}
                </p>
              </div>
              <p
                className={clsx(
                  "text-[1.25rem] text-independence font-regular"
                )}
              >
                {quantity}
              </p>
            </div>

            <div
              className={clsx(
                "flex justify-start items-center",
                "gap-x-[0.75rem]"
              )}
            >
              <img src={props.statusIcon} className={clsx("w-6 h-6")} />
              <p
                className={clsx(
                  "text-base font-bold",
                  `text-${props.statusColor}`
                )}
              >
                {props.orderStatus}
              </p>
            </div>
          </div>
        </div>

        {/* price */}
        <p className={clsx("text-[1.75rem] text-charleston-green font-bold")}>
          {props.price}
        </p>
      </div>
    </div>
  );
}
