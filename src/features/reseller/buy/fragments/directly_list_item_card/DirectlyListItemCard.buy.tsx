import { useContext } from "react";
import clsx from "clsx";
import { BuyDirectlyContext } from "@/src/features/reseller/buy/contexts/BuyDirectly.context";
import ItemListBuy from "../../components/item_list/ItemList.buy";
import { useDirectlySaveCheckoutNote } from "../../hooks/useSaveCheckoutNote.buy";
import { useDirectlySaveCheckoutQuantity } from "../../hooks/useSaveCheckoutQuantity.buy";

export interface IDirectlyListItemCardBuyProps {}

export default function DirectlyListItemCardBuy(
  props: IDirectlyListItemCardBuyProps
) {
  const { state } = useContext(BuyDirectlyContext);
  const { mutate: saveNoteCheckoutItem } = useDirectlySaveCheckoutNote();
  const { mutate: saveQuantityCheckoutItem } =
    useDirectlySaveCheckoutQuantity();

  const handleSaveNote = (data: { id: number; value: string }) => {
    saveNoteCheckoutItem({ variantId: data.id, note: data.value });
  };

  const handleAdd = (data: { id: number; value: number }) => {
    saveQuantityCheckoutItem({ variantId: data.id, quantity: data.value });
  };

  const handleSubstract = (data: { id: number; value: number }) => {
    saveQuantityCheckoutItem({ variantId: data.id, quantity: data.value });
  };

  return (
    <div
      className={clsx(
        "grid gap-y-[2rem] grid-cols-1 items-start content-start",
        "p-6 rounded-[1rem] border max-w-[1200px] w-full box-border",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid grid-cols-1", "gap-y-[1.25rem] w-full")}>
        <div className={clsx("grid grid-cols-1 gap-y-[1rem]", "w-full")}>
          <ItemListBuy
            id={String(state.items.variant_id)}
            image={state.items.image}
            categoryName={state.items.category_name}
            name={state.items.name}
            variant={state.items.variant_name}
            note={state.items.note}
            quantity={state.items.quantity}
            price={state.items.price}
            onSaveNote={handleSaveNote}
            onAdd={handleAdd}
            onSubstract={handleSubstract}
          />
        </div>
      </div>
    </div>
  );
}
