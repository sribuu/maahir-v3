import * as React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { fetchMaahirFAQ } from "@/src/core/lib/api";
import { FAQ_LINK } from "@/src/core/lib/constants";

export interface IFaqHighlightHomeProps {}

export default function FaqHighlightHome(props: IFaqHighlightHomeProps) {
  const { data: faqData } = useQuery({
    queryKey: ["maahir-faq"],
    queryFn: fetchMaahirFAQ,
  });

  return (
    <div
      className={clsx(
        "grid justify-center content-start justify-items-center",
        "pt-[694px] pb-[5rem] gap-y-12 min-h-[68.625rem]",
        "bg-gradient-to-r from-white to-mint-cream"
      )}
    >
      <div
        className={clsx(
          "grid justify-start content-start justify-items-start",
          "max-[56.25rem]",
          "gap-y-12"
        )}
      >
        <p
          className={clsx(
            "text-[2.25rem] font-bold text-center",
            "text-cetacean-blue"
          )}
        >
          {"Pertanyaan yang sering diajukan"}
        </p>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "grid justify-start content-start justify-items-start",
              "gap-y-2"
            )}
          >
            <p
              className={clsx(
                "text-[1.125rem] font-bold",
                "text-charleston-green"
              )}
            >
              {item.question}
            </p>
            <p className={clsx("text-base font-regular", "text-independence")}>
              {item.answer}
            </p>
          </div>
        ))}

        <Link href={FAQ_LINK}>
          <div className={clsx("flex justify-start gap-x-2")}>
            <p
              className={clsx(
                "text-base font-bold text-center",
                "text-ocean-boat-blue"
              )}
            >
              {"Tampilkan Semua"}
            </p>
            <img
              src={"/icons/arrow-blue.svg"}
              width={24}
              height={24}
              loading={"lazy"}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
