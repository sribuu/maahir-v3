import clsx from "clsx";

export interface ISkeletonFilterCardProductProps {}

export default function SkeletonFilterCardProduct(
  props: ISkeletonFilterCardProductProps
) {
  const priceCategoryList = Array.from({ length: 4 }, (_, i) => i + 1);
  const productCategoryList = Array.from({ length: 4 }, (_, i) => i + 1);
  return (
    <div
      className={clsx(
        "grid gap-y-5",
        "p-6 rounded-[1rem] border min-w-[276px]",
        "bg-white shadow-1 border-bright-gray"
      )}
    >
      <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
        <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {"Filter Berdasarkan"}
        </p>

        <hr className={clsx("border border-bright-gray")} />

        {/* price */}

        <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
          <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
            {"Harga"}
          </p>

          {priceCategoryList.map((_, index) => (
            <div
              key={index}
              className={clsx(
                "animate-pulse",
                "bg-bright-gray",
                "w-[226px] h-[50px] rounded-[0.5rem]"
              )}
            />
          ))}
        </div>

        {/* product  */}
        <div className={clsx("grid gap-y-[1.25rem] items-start content-start")}>
          <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
            {"Kategori"}
          </p>

          {productCategoryList.map((_, index) => (
            <div
              key={index}
              className={clsx(
                "flex justify-start items-center",
                "gap-x-[0.625rem]"
              )}
            >
              <div
                className={clsx(
                  "animate-pulse",
                  "bg-bright-gray",
                  "w-[1.25rem] h-[1.25rem] rounded-[0.5rem]"
                )}
              />
              <div
                className={clsx(
                  "animate-pulse",
                  "bg-bright-gray",
                  "w-[100px] h-[20px] rounded-[0.5rem]"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
