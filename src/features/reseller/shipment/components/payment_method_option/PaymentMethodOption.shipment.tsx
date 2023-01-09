import { useState } from "react";
import clsx from "clsx";

export interface IPaymentMethodOptionShipmentProps {
  id?: string;
  logo?: string;
  name?: string;
  selected?: boolean;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
PaymentMethodOptionShipment.defaultProps = {
  id: "",
  logo: "",
  name: "",
  selected: false,
};

export default function PaymentMethodOptionShipment(
  props: IPaymentMethodOptionShipmentProps
) {
  const [hoverItem, setHoverItem] = useState("");
  const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHoverItem("");
    if (props.onSelect) {
      props.onSelect(e);
    }
  };

  const handleMouseOverItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHoverItem(e.currentTarget.id);
  };

  const handleMouseLeaveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHoverItem("");
  };

  return (
    <button
      id={props.id}
      className={clsx(
        "flex justify-between items-center",
        "p-6 rounded-[1rem] w-full",
        "border",
        props.selected
          ? "border-ocean-boat-blue"
          : hoverItem === props.id
          ? "border-ocean-boat-blue"
          : "border-bright-gray",
        props.selected
          ? "bg-ocean-boat-blue-4"
          : hoverItem === props.id
          ? "bg-ocean-boat-blue-4"
          : "white "
      )}
      onClick={handleClickItem}
      onMouseOver={handleMouseOverItem}
      onMouseLeave={handleMouseLeaveItem}
    >
      <div
        className={clsx("flex justify-start items-center", "gap-x-4 w-full")}
      >
        <div
          className={clsx(
            "w-6 h-6 rounded-[50%]",
            "border border-gainsboro",
            props.selected
              ? "hidden"
              : hoverItem === props.id
              ? "hidden"
              : "block"
          )}
        />

        <img
          src={"/icons/check-circle-blue.svg"}
          className={clsx(
            "w-6 h-6",
            props.selected
              ? "block"
              : hoverItem === props.id
              ? "block"
              : "hidden hover:block"
          )}
        />

        <p
          className={clsx(
            "text-[1rem]",
            props.selected ? "font-medium" : "font-regular",
            props.selected
              ? "text-ocean-boat-blue"
              : hoverItem === props.id
              ? "text-ocean-boat-blue"
              : "text-independence"
          )}
        >
          {props.name}
        </p>
      </div>
      <img src={props.logo} className={clsx("h-[1.625rem] object-cover")} />
    </button>
  );
}
