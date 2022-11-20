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
          "w-[176px] h-[132px] rounded-[0.5rem]"
        )}
      />

      <div className={clsx("grid gap-y-[0.25rem]")}>
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[176px] h-[48px] rounded-[0.5rem]"
          )}
        />
        <div
          className={clsx(
            "animate-pulse",
            "bg-bright-gray",
            "w-[96px] h-[32px] rounded-[0.5rem]"
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
            "w-[148px] h-[32px] rounded-[0.5rem]"
          )}
        />
      </div>

      <div
        className={clsx(
          "flex justify-start items-center",
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
    // <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
    //   <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
    //     <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
    //     <div className="flex flex-col space-y-3">
    //       <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
    //       <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
    //     </div>
    //   </div>
    // </div>
  );
}
