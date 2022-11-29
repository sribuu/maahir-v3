import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  IUpdateProfileFormState,
  useDefaultValueUpdateProfileForm,
  useUpdateProfileFormState,
} from "../../hooks/useProfile";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import DropdownComponent from "@/src/core/ui/components/dropdown/Dropdown.component";
import { useBankListData, useBankListQuery } from "../../hooks/useBankList";
import { useCheckBankAccountIsLocked } from "../../hooks/useGetSupplierProfile";
import { RouterPathName } from "@/src/core/lib/constants";
import { useUpdateSupplierProfileQuery } from "../../hooks/useUpdateSupplierProfile";

export interface IEditProfileFormProfileProps {
  defaultData?: IUpdateProfileFormState;
  onSubmit?: (data: IUpdateProfileFormState) => void;
}

export default function EditProfileFormProfile(
  props: IEditProfileFormProfileProps
) {
  const { onSubmit } = props;
  const { data: bankList } = useBankListQuery();
  const list = useBankListData();
  const disabled = useCheckBankAccountIsLocked();
  const defaultValue = useDefaultValueUpdateProfileForm();
  const { formState, setFormState } = useUpdateProfileFormState();

  const {
    mutate: mutateSupplierProfile,
    isLoading: isLoadingMutateSupplierProfile,
  } = useUpdateSupplierProfileQuery();

  const handleChangeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, shop: e.currentTarget.value });
  };

  const handleChangeAccountOwnerName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({ ...formState, name: e.currentTarget.value });
  };

  const handleSelectBank = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormState({ ...formState, accountNumber: e.currentTarget.id });
  };

  const handleChangeAccountNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({ ...formState, shop: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      onSubmit(formState);
    }
    e.preventDefault();

    mutateSupplierProfile({
      name: formState.shop,
      bank_account: formState.accountNumber,
      bank_id: bankList?.filter(
        (item) => item?.option_name === formState?.bankName
      )[0]?.id,
      bank_name_holder: formState.name,
    });
  };

  useEffect(() => {
    setFormState(defaultValue);
  }, [defaultValue]);

  return (
    <form
      className={clsx("grid grid-cols-1 justify-start gap-y-[1rem]", "w-full")}
      onSubmit={handleSubmit}
    >
      <TextfieldComponent
        label={"Nama Toko"}
        placeholder={"Masukkan nama toko"}
        onChange={handleChangeShopName}
        defaultValue={defaultValue.shop}
      />
      <div
        className={clsx(
          "grid grid-cols-2 justify-start gap-x-[1rem]",
          "w-full"
        )}
      >
        <DropdownComponent
          label={"Bank Rekening Tujuan"}
          placeholder={"Pilih Bank"}
          lists={list}
          disabled={disabled}
          onSelect={handleSelectBank}
          defaultValue={defaultValue.bankName}
        />
        <TextfieldComponent
          label={"Nomor Rekening"}
          disabled={disabled}
          placeholder={"Masukkan nomor rekening"}
          onChange={handleChangeAccountNumber}
          defaultValue={defaultValue.accountNumber}
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
          placeholder={"Masukkan nama pemilik rekening"}
          disabled={disabled}
          onChange={handleChangeAccountOwnerName}
          defaultValue={defaultValue.name}
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
          disabled={isLoadingMutateSupplierProfile}
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
