import * as React from "react";
import clsx from "clsx";
import NotesComponent from "@/src/core/ui/components/notes/Notes.component";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";

export interface IItemListBuyProps {
  id?: string;
  image?: string;
  categoryName?: string;
  name?: string;
  quantity?: number;
  checked?: boolean;
  variant?: string;
  note?: string;
  price?: string;
  onAdd?: (data: { id: number; value: number }) => void;
  onSubstract?: (data: { id: number; value: number }) => void;
  onSaveNote?: (data: { id: number; value: string }) => void;
}

ItemListBuy.defaultProps = {
  checked: false,
};

export default function ItemListBuy(props: IItemListBuyProps) {
  const handleSaveNote = (data: { id: string; value: string }) => {
    if (props.onSaveNote) {
      props.onSaveNote({ id: parseInt(props.id), value: data.value });
    }
  };

  const handleAdd = (data: number) => {
    if (props.onAdd) {
      props.onAdd({ id: parseInt(props.id), value: data });
    }
  };

  const handleSubstract = (data: number) => {
    if (props.onSubstract) {
      props.onAdd({ id: parseInt(props.id), value: data });
    }
  };

  return (
    <div className={clsx("flex gap-x-[1.25rem] w-full")}>
      <div
        className={clsx(
          "grid gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div className={clsx("flex gap-x-[1.25rem]", "w-full")}>
            <img
              src={props.image}
              width={126}
              className={clsx(
                "object-cover",
                "w-[110px] sm:w-[126px] h-[88px] sm:h-[150px]",
                "rounded-[0.5rem]"
              )}
            />

            {/* description */}
            <div
              className={clsx(
                "grid gap-y-[0.25rem] sm:gap-y-[0.25rem] grid-cols-1 items-start content-start"
              )}
            >
              <div
                className={clsx(
                  "grid gap-y-[0rem] grid-cols-1 items-start content-start"
                )}
              >
                <p
                  className={clsx(
                    "text-[0.75rem] text-taupe-gray font-regular"
                  )}
                >
                  {props.categoryName}
                </p>
                <p
                  className={clsx(
                    "text-[0.875rem] sm:text-[1rem] text-dark-charcoal font-regular"
                  )}
                >
                  {props.name}
                </p>
              </div>

              <p
                className={clsx(
                  "text-[0.75rem] sm:text-[0.875rem] text-taupe-gray font-regular"
                )}
              >
                {props.variant}
              </p>

              <p
                className={clsx(
                  "text-[0.875rem] sm:text-[0.875rem] text-dark-charcoal font-bold"
                )}
              >
                {props.price}
              </p>

              {/* notes */}
              <div
                className={clsx(
                  "hidden sm:grid gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start"
                )}
              >
                <p
                  className={clsx(
                    "text-[0.75rem] text-taupe-gray font-regular"
                  )}
                >
                  {
                    "Mohon diisi untuk memilih varian atau mengirimkan catatan lainnya ke penjual"
                  }
                </p>
                <NotesComponent
                  id={String(props.id)}
                  value={props.note}
                  onSave={handleSaveNote}
                />
              </div>
            </div>
            {/* end description */}
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
  );
}
