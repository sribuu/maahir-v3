import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";

export interface IEditFormProfileProps {}

export default function EditFormProfile(props: IEditFormProfileProps) {
  return (
    <CardComponent>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Atur Profil"}
        </p>
      </div>
    </CardComponent>
  );
}
