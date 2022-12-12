import { useContext } from "react";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import DropdownComponent from "@/src/core/ui/components/dropdown/Dropdown.component";
import SizeTextfieldComponent from "@/src/core/ui/components/size_textfield/SizeTextfield.component";
import TextareaComponent from "@/src/core/ui/components/textarea/Textarea.component";
import AvailabilitySelectManageProduct from "../availability_select/AvailabilitySelect.manage_product";
import { AddSupplierProductContext } from "../../contexts/add/AddSupplierProduct.context";
import { AddSupplierProductActionEnum } from "../../contexts/add/AddSupplierProduct.types";

export interface IAddItemFormManageProductProps {}

export default function AddItemFormManageProduct(
  props: IAddItemFormManageProductProps
) {
  const { state, dispatch } = useContext(AddSupplierProductContext);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetName,
      payload: e.currentTarget.value,
    });
  };

  const handleSelectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetCategory,
      payload: e.currentTarget.id,
    });
  };

  const handleChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetLength,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetWidth,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetHeight,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetWeight,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetDescription,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeAvailability = (data: string) => {
    dispatch({
      type: AddSupplierProductActionEnum.SetAvailability,
      payload: data,
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-x-[2rem] gap-y-[1.5rem] place-content-start place-items-start",
        "w-full"
      )}
    >
      <TextfieldComponent
        label={"Nama Produk"}
        maxLength={144}
        value={state.item.name.value}
        placeholder={"Masukkan nama produk"}
        helpertext={"Gunakan merek, warna, tipe produkmu untuk membantu"}
        onChange={handleChangeName}
      />

      <DropdownComponent
        label={"Kategori Produk"}
        value={state.item.category.value}
        placeholder={"Pilih kategori"}
        helperText={"Pastikan kategori sesuai produkmu"}
        lists={state.item.category.list}
        onSelect={handleSelectCategory}
      />

      <div
        className={clsx(
          "grid grid-cols-4 gap-x-[0.625rem] place-items-start place-content-start"
        )}
      >
        <SizeTextfieldComponent
          label={"Panjang"}
          placeholder={"Panjang"}
          value={state.item.length.value}
          measurement_unit={"cm"}
          onChange={handleChangeLength}
        />
        <SizeTextfieldComponent
          label={"Lebar"}
          placeholder={"Lebar"}
          value={state.item.width.value}
          measurement_unit={"cm"}
          onChange={handleChangeWidth}
        />
        <SizeTextfieldComponent
          label={"Tinggi"}
          placeholder={"Tinggi"}
          value={state.item.height.value}
          measurement_unit={"cm"}
          onChange={handleChangeHeight}
        />
        <SizeTextfieldComponent
          label={"Berat"}
          placeholder={"Berat"}
          value={state.item.weight.value}
          measurement_unit={"kg"}
          onChange={handleChangeWeight}
        />
      </div>

      <TextareaComponent
        label={"Deskripsi"}
        maxLength={144}
        value={state.item.description.value}
        placeholder={"Tuliskan deskripsi disini"}
        onChange={handleChangeDescription}
      />
      {/* right side */}
      <AvailabilitySelectManageProduct
        selected={state.item.availability.value}
        onChange={handleChangeAvailability}
      />
    </div>
  );
}
