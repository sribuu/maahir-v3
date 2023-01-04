import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface ICounterComponentProps {
  id?: string;
  quantity?: number;
  minCount?: number;
  maxCount?: number;
  onSubstract?: (data: number) => void;
  onSummation?: (data: number) => void;
}

CounterComponent.defaultProps = {
  quantity: 1,
  minCount: 1,
  maxCount: 999999999999,
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
      <button
        id={props.id}
        className={clsx(
          "flex items-center justify-center",
          "border",
          counter <= props.minCount
            ? "border-taupe-gray"
            : "border-ocean-boat-blue",
          "w-[1.5rem] h-[1.5rem] rounded-[50%]"
        )}
        onClick={handleClickMinus}
      >
        <p
          className={clsx(
            counter <= props.minCount
              ? "text-taupe-gray"
              : "text-ocean-boat-blue",
            "font-regular text-[0.875rem]"
          )}
        >
          {"-"}
        </p>
      </button>

      <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
        {counter}
      </p>

      <button
        id={props.id}
        className={clsx(
          "flex items-center justify-center",
          "border",
          counter >= props.maxCount
            ? "border-taupe-gray"
            : "border-ocean-boat-blue",
          "w-[1.5rem] h-[1.5rem] rounded-[50%]"
        )}
        onClick={handleClickPlus}
      >
        <p
          className={clsx(
            counter >= props.maxCount
              ? "text-taupe-gray"
              : "text-ocean-boat-blue",
            "font-regular text-[0.875rem]"
          )}
        >
          {"+"}
        </p>
      </button>
    </div>
  );
}
