import React, { useState } from "react";
import clsx from "clsx";

export interface ICounterComponentProps {
  quantity?: number;
  onSubstract?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSummation?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

CounterComponent.defaultProps = {
  quantity: 0,
};

export default function CounterComponent(props: ICounterComponentProps) {
  const [counter, setCounter] = useState<number>(props.quantity);

  const handleClickMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCounter((count) => (count > 0 ? count - 1 : 0));
    if (props.onSubstract) {
      props.onSubstract(e);
    }
  };
  const handleClickPlus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCounter((count) => count + 1);
    if (props.onSummation) {
      props.onSummation(e);
    }
  };
  return (
    <div className={clsx("flex items-center", "gap-x-2")}>
      <button onClick={handleClickMinus}>
        <img src={"/icons/circle-minus.svg"} />
      </button>

      <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
        {counter}
      </p>

      <button onClick={handleClickPlus}>
        <img src={"/icons/circle-plus.svg"} />
      </button>
    </div>
  );
}
