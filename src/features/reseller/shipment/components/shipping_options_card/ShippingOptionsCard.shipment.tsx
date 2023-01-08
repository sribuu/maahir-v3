import * as React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";
import InformationCircleIcon from "@/src/core/ui/icons/information_circle/InformationCircle.icon";
import OptionsDropdownShipment from "../options_dropdown/OptionsDropdown.shipment";

export interface IShippingOptionsCardShipmentProps {
  title?: string;
  disabled?: boolean;
  informationText?: string;
  orders?: {
    name: string;
    shipping_options: {
      list: {
        name: string;
        eta: string;
        price: string;
      }[];
    };
    sub_total_price: string;
    items: {
      category: string;
      name: string;
      quantity: string;
      price: string;
      photo: string;
      variant: string;
    }[];
  }[];
}

ShippingOptionsCardShipment.defaultProps = {
  title: "Pilih Pengiriman",
  disabled: true,
  informationText:
    "Barang yang kamu pesan akan dikirim dari gudang yang berbeda ya",

  orders: [],
};

export default function ShippingOptionsCardShipment(
  props: IShippingOptionsCardShipmentProps
) {
  return (
    <CardComponent>
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1rem]",
          "w-full",
          "p-[1.5rem]"
        )}
      >
        <h2 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h2>

        {/* badge */}
        <div
          className={clsx(
            "flex items-center justify-start gap-x-[0.625rem]",
            "border border-ocean-boat-blue",
            "rounded-[0.75rem]",
            "px-[0.875rem] py-[0.5rem]",
            "bg-alice-blue",
            "text-[1rem] text-ocean-boat-blue font-medium"
          )}
        >
          <InformationCircleIcon
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-ocean-boat-blue")}
          />
          {props.informationText}
        </div>

        {/* orders */}
        {props.orders.length > 0 &&
          props.orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}
            >
              <h3
                className={clsx("text-[1rem] text-charleston-green font-bold")}
              >
                {order.name}
              </h3>

              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={clsx(
                    "grid grid-cols-3 items-start content-start",
                    "gap-x-[1.5rem]"
                  )}
                >
                  <img
                    src={item.photo}
                    className={clsx("w-[136px] h-[136px]", "rounded-[0.5rem]")}
                  />
                  <div className={clsx("grid grid-cols-1 gap-y-[0.25rem]")}>
                    <div>
                      <p
                        className={clsx(
                          "text-[0.75rem] text-taupe-gray font-regular"
                        )}
                      >
                        {item.category}
                      </p>
                      <p
                        className={clsx(
                          "text-[1rem] text-dark-charcoal font-regular"
                        )}
                      >
                        {item.name}
                      </p>
                    </div>
                    <p
                      className={clsx(
                        "text-[0.875rem] text-taupe-gray font-regular"
                      )}
                    >
                      {`Qty: ${item.quantity}`} {`Variant: ${item.variant}`}
                    </p>
                    <p
                      className={clsx(
                        "text-[1rem] text-charleston-green font-bold"
                      )}
                    >
                      {item.price}
                    </p>
                  </div>

                  {/* shipment options */}

                  <OptionsDropdownShipment
                    disabled={props.disabled}
                    index={itemIndex}
                    options={order.shipping_options.list}
                  />
                </div>
              ))}

              {/* subtotal */}
              <div
                className={clsx(
                  "grid grid-cols-1",
                  "w-full h-[1px]",
                  "bg-bright-gray"
                )}
              />

              <div
                className={clsx("flex items-center justify-between", "w-full")}
              >
                <p
                  className={clsx(
                    "text-[1rem] text-charleston-green font-bold"
                  )}
                >
                  {"SubTotal"}
                </p>
                <p
                  className={clsx(
                    "text-[1rem] text-charleston-green font-bold"
                  )}
                >
                  {order.sub_total_price}
                </p>
              </div>

              <div
                className={clsx(
                  "w-full",
                  "h-[4px] w-full",
                  "bg-bright-gray",
                  orderIndex < props.orders.length - 1 ? "flex" : "hidden"
                )}
              />
            </div>
          ))}
      </div>
    </CardComponent>
  );
}
