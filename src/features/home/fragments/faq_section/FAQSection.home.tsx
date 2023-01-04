import * as React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { fetchMaahirFAQ } from "@/src/core/lib/api";
import { FAQ_LINK, ReactQueryKey } from "@/src/core/lib/constants";
import { IFAQ } from "@/src/core/lib/models/faq";
import { ResellerHomeIdNames } from "../../constants";

export interface IFAQSectionHomeProps {}

export default function FAQSectionHome(props: IFAQSectionHomeProps) {
  const { data: faqData } = useQuery<IFAQ[]>({
    queryKey: [ReactQueryKey.GetFAQ],
    queryFn: fetchMaahirFAQ,
  });

  const faqTopThreeData =
    faqData !== undefined ? faqData.filter((_, index) => index < 3) : [];

  return (
    <div
      className={clsx(
        "grid justify-center content-start justify-items-center w-full grid-cols-1",
        "pb-[5rem] gap-y-12",
        "min-h-[936px] sm:min-h-[1336px]",
        "bg-gradient-to-r from-white to-mint-cream",
        "relative"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 justify-start content-start justify-items-start",
          "max-w-[62.25rem] w-full",
          "gap-y-[40px] sm:gap-y-[3rem]",
          "px-[1rem] sm:px-[0rem]",
          "absolute top-[348px] sm:top-[694px]"
        )}
      >
        <p
          className={clsx(
            "font-bold text-center",
            "text-[1.25rem] sm:text-[2.25rem]",
            "text-cetacean-blue"
          )}
        >
          {"Pertanyaan yang sering diajukan"}
        </p>
        {faqTopThreeData.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "grid justify-start content-start justify-items-start",
              "gap-y-2"
            )}
          >
            <p
              className={clsx(
                "font-bold",
                "text-[1rem] sm:text-[1.125rem]",
                "text-charleston-green"
              )}
            >
              {item.question}
            </p>
            <p
              className={clsx(
                "font-regular",
                "text-[0.875rem] sm:text-[1rem]",
                "text-independence"
              )}
            >
              {item.answer}
            </p>
          </div>
        ))}

        <Link id={ResellerHomeIdNames.SeeAllFAQ} href={FAQ_LINK}>
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
