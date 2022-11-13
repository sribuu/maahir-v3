import * as React from "react";
import clsx from "clsx";

export interface IChoiceOfPaymentMethodListsComponentProps {
  id?: string;
  logo?: string;
  name?: string;
  selected?: boolean;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
ChoiceOfPaymentMethodListsComponent.defaultProps = {
  id: "",
  logo: "",
  name: "",
  selected: false,
};

export default function ChoiceOfPaymentMethodListsComponent(
  props: IChoiceOfPaymentMethodListsComponentProps
) {
  const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSelect) {
      props.onSelect(e);
    }
  };

  return (
    <button
      id={props.id}
      className={clsx(
        "flex justify-between items-center",
        "p-6 rounded-[1rem] w-full",
        "border",
        props.selected ? "border-ocean-boat-blue" : "border-bright-gray",
        props.selected ? "bg-ocean-boat-blue-4" : "white"
      )}
      onClick={handleClickItem}
    >
      <div
        className={clsx("flex justify-start items-center", "gap-x-4 w-full")}
      >
        {!props.selected && (
          <div
            className={clsx("w-6 h-6 rounded-[50%]", "border border-gainsboro")}
          />
        )}

        {props.selected && (
          <img
            src={"/icons/check-circle-blue.svg"}
            className={clsx("w-6 h-6")}
          />
        )}

        <p
          className={clsx(
            "text-[1rem]",
            props.selected ? "font-medium" : "font-regular",
            props.selected ? "text-ocean-boat-blue" : "text-independence"
          )}
        >
          {props.name}
        </p>
      </div>
      <img src={props.logo} className={clsx("h-[1.625rem] object-cover")} />
    </button>
  );
}
