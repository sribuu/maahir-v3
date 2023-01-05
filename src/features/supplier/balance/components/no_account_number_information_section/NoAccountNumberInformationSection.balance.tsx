import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ExternalLink } from "@/src/core/lib/constants";

export interface INoAccountNumberInformationSectionBalanceProps {}

export default function NoAccountNumberInformationSectionBalance(
  props: INoAccountNumberInformationSectionBalanceProps
) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start gap-y-[0.5rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[1rem] text-dark-charcoal font-medium")}>
        {"Rekening Tujuan Pengiriman"}
      </p>
      <p className={clsx("text-[0.875] text-taupe-gray font-regular")}>
        {
          "Anda belum mendaftarkan nomor rekening tujuan, Silakan daftarkan nomor rekening tujuan pada profil anda. "
        }
        <Link href={ExternalLink.WhatsApp} target={"_blank"}>
          <span
            className={clsx("text-[0.875rem] text-ocean-boat-blue font-medium")}
          >
            {"Ke Profil"}
          </span>
        </Link>
      </p>
    </div>
  );
}
