import * as React from "react";
import clsx from "clsx";

export interface ISkeletonItemCardProductProps {}

export default function SkeletonItemCardProduct(
  props: ISkeletonItemCardProductProps
) {
  return (
    <div
      className={clsx(
        "grid",
        "gap-y-[1rem] p-4 rounded-2xl shadow-1",
        "bg-white"
      )}
    >
      <div
        className={clsx(
          "animate-pulse",
          "bg-bright-gray",
          "w-[100%] sm:w-[176px] h-[104px] sm:h-[132px] rounded-[0.5rem]"
        )}
      />

      <div className={clsx("grid gap-y-[0.25rem]")}>
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[144px] sm:w-[176px] h-[20px] sm:h-[48px] rounded-[0.5rem]"
          )}
        />
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[72px] sm:w-[96px] h-[0.875rem] sm:h-[32px] rounded-[0.5rem]"
          )}
        />
      </div>

      <div className={clsx("flex gap-x-[0.375rem] items-start")}>
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[20px] h-[20px] rounded-[50%]"
          )}
        />
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[100%] sm:w-[148px] h-[32px] rounded-[0.5rem]"
          )}
        />
      </div>

      <div
        className={clsx(
          "hidden sm:flex",
          "justify-start items-center",
          "w-full gap-x-[0.625rem]"
        )}
      >
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[128px] h-[40px] rounded-[0.5rem]"
          )}
        />
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[40px] h-[40px] rounded-[0.5rem]"
          )}
        />
      </div>
    </div>
  );
}
