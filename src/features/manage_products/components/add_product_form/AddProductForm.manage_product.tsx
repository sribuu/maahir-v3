import React, { useContext } from "react";
import clsx from "clsx";
import ImageUploadComponent from "@/src/core/ui/components/image_upload/ImageUpload.component";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";
import { AddSupplierProductContext } from "../../contexts/add/AddSupplierProduct.context";
import { useAddSupplierProductsGetCategoryList } from "../../hooks/useGetProductCategory";
import AddItemFormManageProduct from "../add_item_form/AddItemForm.manage_product";
import AddVariantFormManageProduct from "../add_variant_form/AddVariantForm.manage_product";
import { AddSupplierProductActionEnum } from "../../contexts/add/AddSupplierProduct.types";
import InvalidImageUploadlModalManageProduct from "../invalid_image_upload_modal/InvalidImageUpload.manage_product";
import { useAddSupplierProductCreateSupplierProduct } from "../../hooks/usePostCreateSupplierProduct";
import ToastComponent from "@/src/core/ui/components/toast/Toast.component";

export interface IAddProductFormManageProductProps {}

export default function AddProductFormManageProduct(
  props: IAddProductFormManageProductProps
) {
  const { isLoading: isLoadingGetCategoryList } =
    useAddSupplierProductsGetCategoryList();
  const { mutate: createSupplierProduct } =
    useAddSupplierProductCreateSupplierProduct();
  const { state, dispatch } = useContext(AddSupplierProductContext);
  const handleErrorUpload = (error: { message: string }) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetErrorImages,
      payload: {
        status: true,
        message: error.message,
      },
    });
  };

  if (isLoadingGetCategoryList) {
    return <div></div>;
  }

  const handleChangeImages = (
    data: { base64: string; file_format: string }[]
  ) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetImageList,
      payload: data,
    });
  };

  const handleSetCoverImage = (data: number) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetCoverImage,
      payload: data,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSaveProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    createSupplierProduct();
  };

  const handleCloseToast = () => {
    dispatch({
      type: AddSupplierProductActionEnum.CloseNotification,
    });
  };
  return (
    <form
      className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "w-full")}
      onSubmit={handleSubmit}
    >
      <div className={clsx("grid grid-cols-2 gap-x-[2rem]", "w-full")}>
        {/* left side */}
        <AddItemFormManageProduct />

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

      <AddVariantFormManageProduct />

      <div className={clsx("flex items-center justify-end")}>
        <button
          disabled={!state.submit_validation.status}
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
      <ToastComponent
        open={state.notification.open}
        message={"Sukses menambahkan data"}
        error={!state.notification.success}
        onClose={handleCloseToast}
      />
      <InvalidImageUploadlModalManageProduct />
    </form>
  );
}
