import * as React from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import DropdownComponent from "@/src/core/ui/components/dropdown/Dropdown.component";
import TextareaComponent from "@/src/core/ui/components/textarea/Textarea.component";
import CheckcircleComponent from "@/src/core/ui/components/checkcircle/Checkcircle.component";
import ImageUploadComponent from "@/src/core/ui/components/image_upload/ImageUpload.component";

export interface IAddProductFormManageProductProps {}

export default function AddProductFormManageProduct(
  props: IAddProductFormManageProductProps
) {
  const handleErrorUpload = (error: { message: string }) => {
    console.log("ini error", error);
  };

  // const list = useGetSupplierProductCategoryList();

  return (
    <form className={clsx("grid grid-cols-2 gap-x-[2rem]", "w-full")}>
      {/* left side */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-x-[2rem] gap-y-[1.5rem] place-content-start place-items-start",
          "w-full"
        )}
      >
        <TextfieldComponent
          label={"Nama Produk"}
          placeholder={"Masukkan nama produk"}
          helpertext={"Gunakan merek, warna, tipe produkmu untuk membantu"}
        />

        <DropdownComponent
          label={"Kategori Produk"}
          placeholder={"Pilih kategori"}
          helperText={"Pastikan kategori sesuai produkmu"}
          lists={["hallo"]}
        />

        <TextfieldComponent
          label={"Stok Produk"}
          placeholder={"Masukkan jumlah stok"}
        />

        <TextfieldComponent label={"Harga"} placeholder={"Masukkan harga"} />

        <TextareaComponent
          label={"Deskripsi"}
          placeholder={"Tuliskan deskripsi disini"}
        />
        {/* right side */}
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] place-items-start place-content-start"
          )}
        >
          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {"Ketersediaan Produk"}
          </p>
          <div
            className={clsx("flex items-center justify-start gap-x-[1.5rem]")}
          >
            <CheckcircleComponent name={"Tampilkan"} />
            <CheckcircleComponent name={"Sembunyikan"} />
          </div>
        </div>
      </div>

      {/* right side */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-x-[2rem] gap-y-[1.5rem] place-content-start place-items-start",
          "w-full"
        )}
      >
        {/* upload */}
        <ImageUploadComponent onError={handleErrorUpload} />
      </div>
    </form>
  );
}
