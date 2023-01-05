import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ExternalLink } from "@/src/core/lib/constants";

export interface ILoginHelpAuthProps {}

export default function LoginHelpAuth(props: ILoginHelpAuthProps) {
  return (
    <div>
      <p className={clsx("text-[0.875rem] font-regular text-charleston-green")}>
        {"Login Anda bermasalah "}

        <Link href={ExternalLink.WhatsApp} target={"_blank"}>
          <span
            className={clsx("text-ocean-boat-blue font-bold text-[0.875rem]")}
          >
            {"Klik Disini"}
          </span>
        </Link>
      </p>
    </div>
  );
}
