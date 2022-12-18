import * as React from "react";
import clsx from "clsx";
import NotesComponent from "@/src/core/ui/components/notes/Notes.component";
import CheckboxComponent from "@/src/core/ui/components/checkbox/Checkbox.component";
import CounterComponent from "@/src/core/ui/components/counter/Counter.component";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { ICart } from "@/src/core/lib/models";

export interface IItemListCartProps {
  id?: string;
  item: ICart;
  checked?: boolean;
  onAdd?: (data: { id: number; value: number }) => void;
  onSubstract?: (data: { id: number; value: number }) => void;
  onSaveNote?: (data: { id: number; value: string }) => void;
  onSelect?: (data: number) => void;
}

ItemListCart.defaultProps = {
  checked: false,
};

export default function ItemListCart(props: IItemListCartProps) {
  const { item } = props;

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

  const handleSelectItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onSelect) {
      props.onSelect(parseInt(e.currentTarget.id));
    }
  };

  return (
    <div className={clsx("flex gap-x-[1.25rem] w-full")}>
      <CheckboxComponent
        id={String(item.id)}
        value={String(item.id)}
        checked={props.checked}
        onChange={handleSelectItem}
      />
      <div
        className={clsx(
          "grid gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start",
          "w-full"
        )}
      >
        <div className={clsx("flex gap-x-[1.25rem] w-full")}>
          <img
            src={item.image}
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
              "grid gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start"
            )}
          >
            <div
              className={clsx(
                "grid gap-y-[0rem] grid-cols-1 items-start content-start"
              )}
            >
              <p
                className={clsx("text-[0.75rem] text-taupe-gray font-regular")}
              >
                {item.category_name}
              </p>
              <p
                className={clsx(
                  "text-[0.875rem] sm:text-[1rem] text-dark-charcoal font-regular"
                )}
              >
                {item.title}
              </p>
            </div>
            {item.variant?.length > 0 && (
              <p
                className={clsx(
                  "text-[0.75rem] sm:text-[0.875rem] text-taupe-gray font-regular"
                )}
              >
                {item.variant}
              </p>
            )}

            <p
              className={clsx(
                "text-[0.875rem] sm:text-[1.75rem] text-dark-charcoal font-bold"
              )}
            >
              {thousandSeparator(item.price)}
            </p>

            {/* notes */}
            <div
              className={clsx(
                "hidden sm:grid gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start"
              )}
            >
              <p
                className={clsx("text-[0.75rem] text-taupe-gray font-regular")}
              >
                {
                  "Mohon diisi untuk memilih varian atau mengirimkan catatan lainnya ke penjual"
                }
              </p>
              <NotesComponent
                id={String(item.id)}
                value={item.note}
                onSave={handleSaveNote}
              />
            </div>
          </div>
          {/* end description */}
          <div className={clsx("hidden sm:block")}>
            <CounterComponent
              quantity={item.amount}
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
              id={String(item.id)}
              value={item.note}
              onSave={handleSaveNote}
            />
          </div>
          <CounterComponent
            quantity={item.amount}
            onSummation={handleAdd}
            onSubstract={handleSubstract}
          />
        </div>
      </div>
    </div>
  );
}
