import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ItemImageCardProduct from "../../fragments/item_image_card/ItemImageCard.product";
import ItemDescriptionCardProduct from "../../fragments/item_description_card/ItemDescriptionCard.product";

export interface IDetailProductContainerProps {}

export default function DetailProductContainer(
  props: IDetailProductContainerProps
) {
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[4rem] w-full pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div className={clsx("flex gap-[2rem]", "box-border max-w-[1200px]")}>
          <div>
            <ItemImageCardProduct />
          </div>
          <div>
            <ItemDescriptionCardProduct />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
