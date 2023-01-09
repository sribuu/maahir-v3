import * as React from "react";
import clsx from "clsx";
import AccordionComponent from "../../../../../core/ui/components/accordion/Accordion.component";

export interface IAccordionListCardFAQProps {
  open?: string[];
  lists?: { question: string; answer: string }[];
}
AccordionListCardFAQ.defaultProps = {
  open: [],
  lists: [],
};

export default function AccordionListCardFAQ(
  props: IAccordionListCardFAQProps
) {
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
