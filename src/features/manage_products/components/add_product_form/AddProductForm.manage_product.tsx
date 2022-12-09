import * as React from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import DropdownComponent from "@/src/core/ui/components/dropdown/Dropdown.component";
import TextareaComponent from "@/src/core/ui/components/textarea/Textarea.component";
import CheckcircleComponent from "@/src/core/ui/components/checkcircle/Checkcircle.component";
import ImageUploadComponent from "@/src/core/ui/components/image_upload/ImageUpload.component";
import SizeTextfieldComponent from "@/src/core/ui/components/size_textfield/SizeTextfield.component";
import DividerComponent from "@/src/core/ui/components/divider/Divider.component";

export interface IAddProductFormManageProductProps {}

export default function AddProductFormManageProduct(
  props: IAddProductFormManageProductProps
) {
  const handleErrorUpload = (error: { message: string }) => {
    console.log("ini error", error);
  };

  // const list = useGetSupplierProductCategoryList();
  const header = ["SKU", "Varian", "Harga", "Produk", "Pilihan Aksi"];
  const form = [
    {
      sku: {
        label: "SKU",
        value: "",
      },
      variant: {
        label: "Varian",
        value: "",
      },
      price: {
        label: "Harga",
        value: "",
      },
      product: {
        label: "Produk",
        value: "",
      },
      action: {
        label: "Pilihan Aksi",
        value: "",
      },
    },
  ];

  const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.id, e.currentTarget.name, "ini apa");
  };
  return (
    <form className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "w-full")}>
      <div className={clsx("grid grid-cols-2 gap-x-[2rem]", "w-full")}>
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

          <div
            className={clsx(
              "grid grid-cols-4 gap-x-[0.625rem] place-items-start place-content-start"
            )}
          >
            <SizeTextfieldComponent label={"Panjang"} measurement_unit={"cm"} />
            <SizeTextfieldComponent label={"Lebar"} measurement_unit={"cm"} />
            <SizeTextfieldComponent label={"Tinggi"} measurement_unit={"cm"} />
            <SizeTextfieldComponent label={"Berat"} measurement_unit={"kg"} />
          </div>
          {/* <TextfieldComponent
          label={"Stok Produk"}
          placeholder={"Masukkan jumlah stok"}
        /> */}

          {/* <TextfieldComponent label={"Harga"} placeholder={"Masukkan harga"} /> */}

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
      </div>

      <DividerComponent />

      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1rem] place-content-start place-items-start",
          "w-full"
        )}
      >
        <h1 className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {"Varian Produk"}
        </h1>
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] place-content-start place-items-start ",
            "w-full"
          )}
        >
          <div className={clsx("grid grid-cols-5", "w-full p-[0.5rem]")}>
            {header.map((item, index) => (
              <p
                key={index}
                className={clsx(
                  "text-[1rem] text-charleston-green font-medium"
                )}
              >
                {item}
              </p>
            ))}
          </div>
          <DividerComponent />
          <div
            className={clsx(
              "grid grid-cols-5 gap-x-[1.5rem]",
              "w-full p-[0.5rem]"
            )}
          >
            {form.map((item, index) => {
              {
                return Object.keys(item).map((keys, id) => {
                  return (
                    <TextfieldComponent
                      id={String(index)}
                      name={keys}
                      key={keys}
                      label={item[keys].label}
                      variant={"small"}
                      placeholder={item[keys].label}
                      onChange={handleChangeVariant}
                    />
                  );
                });
              }
            })}
          </div>

          <button>
            <p
              className={clsx("text-ocean-boat-blue text-[0.875rem] font-bold")}
            >
              {"Tambah Varian"}
            </p>
          </button>
        </div>
      </div>
    </form>
  );
}
