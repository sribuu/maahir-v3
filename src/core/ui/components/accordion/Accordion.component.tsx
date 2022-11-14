import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface IAccordionComponentProps {
  question?: string;
  answer?: string;
  open?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
AccordionComponent.defaultProps = {
  question: "",
  answer: "",
  open: false,
};

export default function AccordionComponent(props: IAccordionComponentProps) {
  const [open, setOpen] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((state) => (state = !open));
  };

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-6 rounded-2xl w-full"
      )}
    >
      <button
        className={clsx("flex justify-between items-center", "gap-y-6 w-full")}
        onClick={handleClick}
      >
        <p className={clsx("text-base text-dark-charcoal font-bold")}>
          {props.question}
        </p>

        <img
          src={"/icons/chevron-down.svg"}
          className={clsx(open ? "rotate-180" : "rotate-0")}
        />
      </button>
      {open && (
        <p className={clsx("text-base text-independence font-regular")}>
          {props.answer}
        </p>
      )}
    </div>
  );
}
