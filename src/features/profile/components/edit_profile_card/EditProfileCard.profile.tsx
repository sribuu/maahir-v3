import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import DropdownComponent from "@/src/core/ui/components/dropdown/Dropdown.component";
import { RouterPathName } from "@/src/core/lib/constants";
import { useBankListData, useBankListQuery } from "../../hooks/useBankList";
export interface IEditProfileCardProfileProps {}

export default function EditProfileCardProfile(
  props: IEditProfileCardProfileProps
) {
  const { isLoading, isSuccess } = useBankListQuery();
  const list = useBankListData();
  console.log(isLoading, list, "ini data");
  if (isLoading) {
    return <div />;
  }
  return (
    <CardComponent className={clsx("p-[1.5rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Atur Profil"}
        </p>

        <form
          className={clsx(
            "grid grid-cols-1 justify-start gap-y-[1rem]",
            "w-full"
          )}
        >
          <TextfieldComponent
            label={"Nama Toko"}
            placeholder={"Masukkan nama toko"}
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
            />
            <TextfieldComponent
              label={"Nomor Rekening"}
              placeholder={"Masukkan nomor rekening"}
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
              className={clsx(
                "w-[190px] h-[3.5rem] rounded-[0.75rem]",
                "bg-ocean-boat-blue",
                "text-white text-[1rem] font-bold"
              )}
              value={"Simpan"}
            />
          </div>
        </form>
      </div>
    </CardComponent>
  );
}
