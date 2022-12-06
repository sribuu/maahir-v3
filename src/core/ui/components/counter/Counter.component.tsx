import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface ICounterComponentProps {
  id?: string;
  quantity?: number;
  onSubstract?: (data: number) => void;
  onSummation?: (data: number) => void;
}

CounterComponent.defaultProps = {
  quantity: 1,
};

export default function CounterComponent(props: ICounterComponentProps) {
  const [counter, setCounter] = useState<number>(props.quantity);

  const handleClickMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCounter((count) => (count > 1 ? count - 1 : 1));
    if (props.onSubstract) {
      props.onSubstract(counter > 1 ? counter - 1 : 1);
    }
  };
  const handleClickPlus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCounter((count) => count + 1);
    if (props.onSummation) {
      props.onSummation(counter + 1);
    }
  };

  useEffect(() => {
    if (props.quantity) {
      setCounter(props.quantity);
    }
  }, [props.quantity]);
  return (
    <div className={clsx("flex items-center", "gap-x-2")}>
      <button id={props.id} onClick={handleClickMinus}>
        <img src={"/icons/circle-minus.svg"} />
      </button>

      <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
        {counter}
      </p>

      <button id={props.id} onClick={handleClickPlus}>
        <img src={"/icons/circle-plus.svg"} />
      </button>
    </div>
  );
}
