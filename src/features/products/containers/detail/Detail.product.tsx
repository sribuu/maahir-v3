import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import ItemImageCardProduct from "../../fragments/item_image_card/ItemImageCard.product";
import ItemDescriptionCardProduct from "../../fragments/item_description_card/ItemDescriptionCard.product";
import ImagesSwipeableProduct from "../../fragments/images_swipeable/ImagesSwipeable.product";
import ItemDescriptionProduct from "../../fragments/item_description/ItemDecription.product";

export interface IDetailProductContainerProps {}

export default function DetailProductContainer(
  props: IDetailProductContainerProps
) {
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[4rem] w-full pt-[70px] sm:pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid items-start content-start justify-start justify-items-start gap-[2rem]",
            "grid-cols-1 md:grid-cols-[auto_auto]",
            "box-border max-w-[1200px]",
            "w-full sm:w-auto"
          )}
        >
          <div className={clsx("hidden sm:block")}>
            <ItemImageCardProduct />
          </div>

          <div className={clsx("grid sm:hidden", "grid-cols-1", "w-full")}>
            <ImagesSwipeableProduct />
          </div>

          <div className={clsx("hidden sm:grid", "grid-cols-1", "w-full")}>
            <ItemDescriptionCardProduct />
          </div>

          <div className={clsx("grid sm:hidden", "grid-cols-1", "w-full")}>
            <ItemDescriptionProduct />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
