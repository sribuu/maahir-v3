import * as React from "react";
import clsx from "clsx";
import AccordionComponent from "../accordion/Accordion.component";

export interface IFAQCardComponentProps {
  open?: string[];
  lists?: { question: string; answer: string }[];
}
FAQCardComponent.defaultProps = {
  open: [],
  lists: [],
};

export default function FAQCardComponent(props: IFAQCardComponentProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-6 p-6 rounded-2xl max-w-[56.25rem] w-full",
        "bg-white shadow-2"
      )}
    >
      {props.lists !== undefined &&
        props.lists.length > 0 &&
        props.lists.map((item, index) => (
          <AccordionComponent
            key={index}
            open={props.open.includes(String(index))}
            question={item.question}
            answer={item.answer}
          />
        ))}
    </div>
  );
}
