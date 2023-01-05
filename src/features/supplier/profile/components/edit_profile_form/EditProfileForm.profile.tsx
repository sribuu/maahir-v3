import { useContext } from "react";
import Link from "next/link";
import clsx from "clsx";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import DropdownComponent from "@/src/core/ui/components/dropdown/Dropdown.component";
import { RouterPathName } from "@/src/core/lib/constants";
import { useProfileUpdateSupplierProfile } from "../../hooks/useUpdateSupplierProfile";
import { ProfileUpdateContext } from "../../contexts/update/ProfileUpdate.context";
import { ProfileUpdateActionEnum } from "../../contexts/update/ProfileUpdate.types";
import { useProfileUpdateGetSupplierData } from "../../hooks/useGetSupplierProfile";
import { useProfileUpdateGetBankList } from "../../hooks/useBankList";
import { useProfileUpdateGetAddressList } from "../../hooks/useAddressList";

export interface IEditProfileFormProfileProps {}

export default function EditProfileFormProfile(
  props: IEditProfileFormProfileProps
) {
  const { isLoading: isLoadingGetSupplierData } =
    useProfileUpdateGetSupplierData();
  const { isLoading: isLoadingGetBankList } = useProfileUpdateGetBankList();
  const { isLoading: isLoadingGetAddressList } =
    useProfileUpdateGetAddressList();
  const {
    mutate: updateSupplierProfile,
    isLoading: isLoadingUpdateSupplierProfile,
  } = useProfileUpdateSupplierProfile();
  const { state, dispatch } = useContext(ProfileUpdateContext);

  const isLoading =
    isLoadingGetSupplierData || isLoadingGetBankList || isLoadingGetAddressList;

  if (isLoading) {
    return <div />;
  }

  const handleChangeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ProfileUpdateActionEnum.SetShopName,
      payload: e.currentTarget.value,
    });
  };

  const handleSelectAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: ProfileUpdateActionEnum.SetAddress,
      payload: e.currentTarget.id,
    });
  };

  const handleChangeDetailAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ProfileUpdateActionEnum.SetDetailAddress,
      payload: e.currentTarget.value,
    });
  };

  const handleChangeAccountOwnerName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ProfileUpdateActionEnum.SetAccountNumberHolder,
      payload: e.currentTarget.value,
    });
  };

  const handleSelectBank = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: ProfileUpdateActionEnum.SetBank,
      payload: e.currentTarget.id,
    });
  };

  const handleChangeAccountNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: ProfileUpdateActionEnum.SetAccountNumber,
      payload: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSupplierProfile();
  };

  return (
    <form
      className={clsx("grid grid-cols-1 justify-start gap-y-[1rem]", "w-full")}
      onSubmit={handleSubmit}
    >
      <TextfieldComponent
        label={"Nama Toko"}
        value={state.form.shop_name.value}
        placeholder={"Masukkan nama toko"}
        onChange={handleChangeShopName}
      />

      <DropdownComponent
        label={"Alamat"}
        value={state.form.address.value}
        placeholder={"Pilih Alamat"}
        lists={state.form.address.list}
        onSelect={handleSelectAddress}
      />

      <TextfieldComponent
        label={"Detail Alamat"}
        value={state.form.detail_address.value}
        placeholder={"Masukkan detail alamat"}
        onChange={handleChangeDetailAddress}
      />

      <div
        className={clsx(
          "grid grid-cols-2 justify-start gap-x-[1rem]",
          "w-full"
        )}
      >
        <DropdownComponent
          label={"Bank Rekening Tujuan"}
          value={state.form.bank.value}
          placeholder={"Pilih Bank"}
          lists={state.form.bank.list}
          disabled={state.is_locked_bank}
          onSelect={handleSelectBank}
        />
        <TextfieldComponent
          label={"Nomor Rekening"}
          value={state.form.account_number.value}
          disabled={state.is_locked_bank}
          placeholder={"Masukkan nomor rekening"}
          onChange={handleChangeAccountNumber}
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[0.25rem]",
          "w-full"
        )}
      >
        <TextfieldComponent
          label={"Nama Pemilik Rekening"}
          value={state.form.account_number_holder.value}
          placeholder={"Masukkan nama pemilik rekening"}
          disabled={state.is_locked_bank}
          onChange={handleChangeAccountOwnerName}
        />
        <p className={clsx("text-[0.75rem] text-taupe-gray font-regular")}>
          {
            "Pengisian rekening bank hanya bisa dilakukan satu kali. Perubahan selanjutnya hanya bisa dilakukan dengan menghubungi pihak Maahir. "
          }
          <Link href={RouterPathName.Login}>
            <span
              className={clsx(
                "text-[0.75rem] text-ocean-boat-blue font-medium"
              )}
            >
              {"Hubungi Maahir"}
            </span>
          </Link>
        </p>
      </div>

      <div className={clsx("flex items-end justify-end", "w-full")}>
        <input
          type={"submit"}
          disabled={isLoadingUpdateSupplierProfile}
          className={clsx(
            "w-[190px] h-[3.5rem] rounded-[0.75rem]",
            "bg-ocean-boat-blue",
            "disabled:opacity-40",
            "text-white text-[1rem] font-bold",
            "cursor-pointer",
            "disabled:cursor-default"
          )}
          value={"Simpan"}
        />
      </div>
    </form>
  );
}
