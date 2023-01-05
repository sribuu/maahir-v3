import * as React from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import FAQCardComponent from "@/src/core/ui/components/faq_card/FAQCard.component";
import { resellerFAQ } from "@/src/core/data/reseller/static";

export interface IFAQContainerProps {}

export default function FAQContainer(props: IFAQContainerProps) {
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
          <FAQCardComponent lists={resellerFAQ} />
        </div>
      </div>
    </MainLayout>
  );
}
