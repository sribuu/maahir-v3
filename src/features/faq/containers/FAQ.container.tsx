import * as React from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import FAQCardComponent from "@/src/core/ui/components/faq_card/FAQCard.component";
import { fetchMaahirFAQ } from "@/src/core/lib/api";
import { IFAQ } from "@/src/core/lib/models/faq";

export interface IFAQContainerProps {}

export default function FAQContainer(props: IFAQContainerProps) {
  const { data: faqData } = useQuery<IFAQ[]>({
    queryKey: ["maahir-faq"],
    queryFn: fetchMaahirFAQ,
  });
  return (
    <MainLayout>
      <div
        className={clsx(
          "bg-[url('/background/faq.svg')]",
          "min-h-[254px] sm:min-h-[28.75rem] p-t-[5.25rem]",
          "flex items-center justify-center",
          "w-full"
        )}
      >
        <h1
          className={clsx(
            "text-[1.25rem] sm:text-[2.625rem]",
            "font-bold",
            "text-white",
            "text-center"
          )}
        >
          {"Pertanyaan yang sering diajukan"}
        </h1>
      </div>

      <div
        className={clsx(
          "relative",
          "w-full h-[56.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "absolute top-[-5rem]",
            "grid grid-cols-1 justify-center justify-items-center",
            "w-full",
            "px-[1rem] sm:px-[0rem]"
          )}
        >
          <FAQCardComponent lists={faqData} />
        </div>
      </div>
    </MainLayout>
  );
}
