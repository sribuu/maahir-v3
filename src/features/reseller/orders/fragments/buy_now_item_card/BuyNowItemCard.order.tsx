import clsx from "clsx";
import React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import NotesComponent from "@/src/core/ui/components/notes/Notes.component";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import AvatarComponent from "@/src/core/ui/components/avatar/Avatar.component";
export interface IBuyNowItemOrderProps {
  id?: string;
  productSrc?: string;
  name?: string;
  price?: string;
  quantity?: number;
  category?: string;
  note?: string;
  onSubstract?: (data: number) => void;
  onAdd?: (data: number) => void;
  onSaveNote?: (data: { id: number; value: string }) => void;
}
BuyNowItemOrder.defaultProps = {
  id: "",
  productSrc: "",
  category: "Kecantikan",
  name: "Paket Reseller Parfum",
  price: "Rp 49.999",
  quantity: 0,
  note: "",
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

  const handleSaveNote = (data: { id: string; value: string }) => {
    if (props.onSaveNote) {
      props.onSaveNote({ id: parseInt(props.id), value: data.value });
    }
  };
  const handleSelectSupplier = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
  };
  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div className={clsx("grid grid-cols-1", "w-full", "gap-y-[1rem]")}>
        <div className={clsx("flex items-center justify-start gap-x-[1rem]")}>
          <CheckboxComponent
            value={String(-1)}
            checked={false}
            onChange={handleSelectSupplier}
          />
          <AvatarComponent text={"F"} />
          <div
            className={clsx(
              "grid grid-cols-1 justify-start justify-items-start gap-y-[0.125rem]"
            )}
          >
            <p
              className={clsx(
                "text-[1rem] font-bold text-charleston-green text-start"
              )}
            >
              {"F"}
            </p>
            <p
              className={clsx(
                "text-[0.75rem] font-regular text-charleston-green text-start"
              )}
            >
              {"Jakarta Pusat"}
            </p>
          </div>
        </div>

        {/* content */}
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[1rem]",
            "px-[1rem] sm:px-[0rem]"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-start",
              "gap-x-[1.5rem] w-full"
            )}
          >
            <img
              src={props.productSrc}
              className={clsx(
                "w-[110px] sm:w-[126px] h-[88px] sm:h-[150px]",
                "rounded-[0.5rem]",
                "object-cover"
              )}
            />

            {/* content */}
            <div className={clsx("grid gap-y-[0.75rem] grid-cols-1")}>
              <div className={clsx("grid gap-y-[0.25rem] grid-cols-1")}>
                <div className={clsx("grid grid-cols-1")}>
                  <p
                    className={clsx(
                      "text-[0.75rem] text-taupe-gray font-regular"
                    )}
                  >
                    {props.category}
                  </p>
                  <p
                    className={clsx(
                      "text-[1rem] text-dark-charcoal font-regular"
                    )}
                  >
                    {props.name}
                  </p>
                </div>

                <p
                  className={clsx(
                    "text-[1.25rem] text-charleston-green font-bold"
                  )}
                >
                  {props.price}
                </p>
              </div>

              {/* notes */}
              <div
                className={clsx(
                  "hidden sm:grid grid-cols-1 gap-y-[0.5rem]",
                  "w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-[0.875rem] text-taupe-gray font-regular"
                  )}
                >
                  {
                    "Mohon diisi untuk memilih varian atau mengirimkan catatan lainnya ke penjual"
                  }
                </p>

                <NotesComponent value={props.note} onSave={handleSaveNote} />
              </div>
            </div>

            <div className={clsx("hidden sm:grid")}>
              <CounterComponent
                quantity={props.quantity}
                onSummation={handleAdd}
                onSubstract={handleSubstract}
              />
            </div>
          </div>

          <div
            id={"mobile-notes-counter"}
            className={clsx(
              "grid sm:hidden grid-cols-[1fr_auto] items-center justify-between content-center justify-items-start",
              "gap-x-[0.625rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid sm:hidden gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start"
              )}
            >
              <NotesComponent
                id={String(props.id)}
                value={props.note}
                onSave={handleSaveNote}
              />
            </div>
            <CounterComponent
              quantity={props.quantity}
              onSummation={handleAdd}
              onSubstract={handleSubstract}
            />
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
