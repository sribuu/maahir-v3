import clsx from "clsx";
import React, { useState } from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import NotesInputComponent from "@/src/core/ui/components/notes_input/NotesInput.component";
export interface IBuyNowItemOrderProps {
  productSrc?: string;
  name?: string;
  price?: string;
  quantity?: number;
  category?: string;
  notes?: string;
  onSubstract?: (data: number) => void;
  onAdd?: (data: number) => void;
  onChangeNotes?: (data: string) => void;
}
BuyNowItemOrder.defaultProps = {
  productSrc: "",
  category: "Kecantikan",
  name: "Paket Reseller Parfum",
  price: "Rp 49.999",
  quantity: 0,
  notes: "",
};

export default function BuyNowItemOrder(props: IBuyNowItemOrderProps) {
  const handleSubstract = (data: number) => {
    if (props.onSubstract) {
      props.onSubstract(data);
    }
  };

  const handleAdd = (data: number) => {
    if (props.onAdd) {
      props.onAdd(data);
    }
  };

  const onChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeNotes) {
      props.onChangeNotes(e.currentTarget.value);
    }
  };
  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div
        className={clsx(
          "flex items-center justify-start",
          "gap-x-[1.5rem] w-full"
        )}
      >
        <img
          src={props.productSrc}
          className={clsx(
            "rounded-[0.5rem] w-[126px] h-[150px]",
            "object-cover"
          )}
        />

        {/* content */}
        <div className={clsx("grid gap-y-[0.75rem] grid-cols-1")}>
          <div className={clsx("grid gap-y-[0.25rem] grid-cols-1")}>
            <div className={clsx("grid grid-cols-1")}>
              <p
                className={clsx("text-[0.75rem] text-taupe-gray font-regular")}
              >
                {props.category}
              </p>
              <p
                className={clsx("text-[1rem] text-dark-charcoal font-regular")}
              >
                {props.name}
              </p>
            </div>

            <p
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.price}
            </p>
          </div>

          {/* notes */}
          <div className={clsx("grid grid-cols-1 gap-y-[0.5rem]", "w-full")}>
            <p className={clsx("text-[0.875rem] text-taupe-gray font-regular")}>
              {
                "Mohon diisi untuk memilih varian atau mengirimkan catatan lainnya ke penjual"
              }
            </p>
            <NotesInputComponent
              value={props.notes}
              placeholder={"Tulis Catatan Disini"}
              onChange={onChangeNotes}
            />
          </div>
        </div>

        <CounterComponent
          quantity={props.quantity}
          onSubstract={handleSubstract}
          onSummation={handleAdd}
        />
      </div>
    </CardComponent>
  );
}
