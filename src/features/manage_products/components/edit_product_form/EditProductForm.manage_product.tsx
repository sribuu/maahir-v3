import React, { useContext } from "react";
import clsx from "clsx";
import ImageUploadComponent from "@/src/core/ui/components/image_upload/ImageUpload.component";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import { useEditSupplierProductsGetCategoryList } from "../../hooks/useGetProductCategory";
import EditItemFormManageProduct from "../edit_item_form/EditItemForm.manage_product";
import EditVariantFormManageProduct from "../edit_variant_form/EditVariantForm.manage_product";
import { EditSupplierProductContext } from "../../contexts/edit/EditSupplierProduct.context";
import { EditSupplierProductActionEnum } from "../../contexts/edit/EditSupplierProduct.types";

export interface IEditProductFormManageProductProps {}

export default function EditProductFormManageProduct(
  props: IEditProductFormManageProductProps
) {
  const { isLoading: isLoadingGetCategoryList } =
    useEditSupplierProductsGetCategoryList();
  const { state, dispatch } = useContext(EditSupplierProductContext);
  const handleErrorUpload = (error: { message: string }) => {
    // console.log("ini error", error);
  };

  if (isLoadingGetCategoryList) {
    return <div></div>;
  }

  const handleChangeImages = (
    data: { base64: string; file_format: string }[]
  ) => {
    dispatch({
      type: EditSupplierProductActionEnum.SetImageList,
      payload: data,
    });
  };

  const handleSetCoverImage = (data: number) => {
    dispatch({
      type: EditSupplierProductActionEnum.SetCoverImage,
      payload: data,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSaveProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    //
  };
  return (
    <form
      className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "w-full")}
      onSubmit={handleSubmit}
    >
      <div className={clsx("grid grid-cols-2 gap-x-[2rem]", "w-full")}>
        {/* left side */}
        <EditItemFormManageProduct />

        {/* right side */}
        <div
          className={clsx(
            "grid grid-cols-1 gap-x-[2rem] gap-y-[1.5rem] place-content-start place-items-start",
            "w-full"
          )}
        >
          {/* upload */}
          <ImageUploadComponent
            onError={handleErrorUpload}
            onChange={handleChangeImages}
            onSetCoverImage={handleSetCoverImage}
          />
        </div>
      </div>

      <DividerComponent />

      <EditVariantFormManageProduct />

      <div className={clsx("flex items-center justify-end")}>
        <button
          disabled={true}
          className={clsx(
            "flex items-center justify-center",
            "py-[0.875rem] px-[2.25rem] rounded-[0.75rem]",
            "bg-ocean-boat-blue",
            "disabled:opacity-40 opacity-100",
            "text-[1rem] text-white font-bold"
          )}
          onClick={handleSaveProduct}
        >
          {"Simpan Produk"}
        </button>
      </div>
    </form>
  );
}
