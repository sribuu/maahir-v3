import * as React from "react";
import clsx from "clsx";

export interface IUnavailableItemListCartProps {
  id?: string;
  image?: string;
  categoryName?: string;
  name?: string;
  variant?: string;
  price?: string;
}

UnavailableItemListCart.defaultProps = {
  checked: false,
};

export default function UnavailableItemListCart(
  props: IUnavailableItemListCartProps
) {
  const stockIsNotAvailableText = "Stok Habis";
  return (
    <div className={clsx("flex gap-x-[1.25rem]", "w-full")}>
      <div
        className={clsx(
          "grid gap-y-[0.25rem] sm:gap-y-[0.75rem] grid-cols-1 items-start content-start",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "flex gap-x-[1.25rem] justify-between items-center",
            "w-full"
          )}
        >
          <div className={clsx("flex gap-x-[1.25rem]", "opacity-40")}>
            <img
              src={props.image}
              width={126}
              className={clsx(
                "object-cover",
                "w-[110px] sm:w-[126px] h-[88px] sm:h-[150px]",
                "rounded-[0.5rem]"
              )}
            />

            {/* description */}
            <div
              className={clsx(
                "grid gap-y-[0.25rem] sm:gap-y-[0.25rem] grid-cols-1 items-start content-start"
              )}
            >
              <div
                className={clsx(
                  "grid gap-y-[0rem] grid-cols-1 items-start content-start"
                )}
              >
                <p
                  className={clsx(
                    "text-[0.75rem] text-taupe-gray font-regular"
                  )}
                >
                  {props.categoryName}
                </p>
                <p
                  className={clsx(
                    "text-[0.875rem] sm:text-[1rem] text-dark-charcoal font-regular"
                  )}
                >
                  {props.name}
                </p>
              </div>

              <p
                className={clsx(
                  "text-[0.75rem] sm:text-[0.875rem] text-taupe-gray font-regular"
                )}
              >
                {props.variant}
              </p>

              <p
                className={clsx(
                  "text-[0.875rem] sm:text-[0.875rem] text-dark-charcoal font-bold"
                )}
              >
                {props.price}
              </p>
            </div>
          </div>

          {/* end description */}
          <div className={clsx("hidden sm:grid")}>
            <p className={clsx("text-[0.875rem] text-tart-orange font-bold")}>
              {stockIsNotAvailableText}
            </p>
          </div>
        </div>

        {/* mobile */}
        <div
          id={"mobile-notes-counter"}
          className={clsx(
            "grid sm:hidden grid-cols-[1fr_auto] items-center justify-between content-center justify-items-start",
            "gap-x-[0.625rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[0.75rem] text-tart-orange font-bold")}>
            {stockIsNotAvailableText}
          </p>
        </div>
      </div>
    </div>
  );
}
