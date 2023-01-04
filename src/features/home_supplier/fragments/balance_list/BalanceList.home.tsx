import * as React from "react";
import clsx from "clsx";

export interface IBalanceListHomeProps {
  name?: string;
  price?: string;
}

BalanceListHome.defaultProps = {
  name: "",
  price: "",
};

export const changeBalanceColor: (name: string) => string = (name: string) => {
  if (name === "SALDO TERSEDIA") {
    return "caribbean-green";
  } else if (name === "SALDO TERTAHAN") {
    return "tart-orange";
  } else {
    return "";
  }
};

export const changeBalanceIcon: (name: string) => string = (name: string) => {
  if (name === "SALDO TERSEDIA") {
    return "/icons/action-money-green.svg";
  } else if (name === "SALDO TERTAHAN") {
    return "/icons/system-restore-red.svg";
  } else {
    return "";
  }
};

export default function BalanceListHome(props: IBalanceListHomeProps) {
  const { name } = props;
  const color = changeBalanceColor(name);
  const icon = changeBalanceIcon(name);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "p-[1rem] w-full rounded-[1rem]",
        "border border-bright-gray"
      )}
    >
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <div
          className={clsx("grid grid-cols-1 justify-start gap-y-[0.125rem]")}
        >
          <p className={clsx("text-[0.875rem] text-independence font-regular")}>
            {name}
          </p>
          <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
            {props.price}
          </p>
        </div>
        {/* circle */}
        <div
          className={clsx(
            "flex justify-center items-center",
            "w-[56px] h-[56px] rounded-[50%]",
            `bg-${color} bg-opacity-10`,
            "box-border"
          )}
        >
          <img src={icon} />
        </div>
      </div>
    </div>
  );
}
