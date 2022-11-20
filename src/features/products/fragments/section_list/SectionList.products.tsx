import React, { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ItemCardProduct from "@/src/features/products/fragments/item_card/ItemCard.product";
import { fetchInfinityListProducts } from "@/src/core/lib/api/dynamic";
import { ICart, IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import {
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import SkeletonItemCardProduct from "../skeleton_item_card";
import { fetchAddToCart } from "@/src/core/lib/storage";
export interface ISectionListsProductsProps {}

export default function SectionListProducts(props: ISectionListsProductsProps) {
  const { ref, inView } = useInView();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isFetching, fetchNextPage, isSuccess, isLoading } =
    useInfiniteQuery<IProducts[], unknown, IProducts[], string[]>(
      [ReactQueryKey.GetInfinityProductList],

      async ({ pageParam = 1 }) => {
        return fetchInfinityListProducts(pageParam);
      },
      {
        getNextPageParam: (lastPage: IProducts[], pages: IProducts[][]) => {
          return pages.length + 1;
        },
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const itemsCount = Array.from({ length: 16 }, (_, i) => i + 1);

  if (isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-2 w-full"
        )}
      >
        <div
          className={clsx(
            "grid justify-center justify-items-center",
            "max-w-[75rem] gap-x-[1.25rem] gap-y-[1.25rem]",
            "grid-cols-4"
            // ":xs-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {itemsCount.map((item) => (
            <SkeletonItemCardProduct key={item} />
          ))}
        </div>
      </div>
    );
  }

  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderProduct,
      query: { [RouterQueryKey.ProductId]: parseInt(e.currentTarget.id) },
    });
  };

  const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.ProductDetail,
      query: {
        [RouterQueryKey.ProductId]: e.currentTarget.id,
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-center content-start justify-items-center",
        "gap-y-2 w-full"
      )}
    >
      <div
        className={clsx(
          "grid justify-center justify-items-center",
          "max-w-[75rem] gap-x-[1.25rem] gap-y-[1.25rem]",
          "grid-cols-4"
        )}
      >
        {isSuccess &&
          data?.pages?.map((page: IProducts[]) =>
            page.map((item: IProducts, index) => {
              return (
                <ItemCardProduct
                  productRef={
                    index === data.pages.length * page.length - 1 ? ref : null
                  }
                  key={index}
                  id={String(item.id)}
                  name={item.title}
                  data={item}
                  profitValue={thousandSeparator(item.profit_value)}
                  price={thousandSeparator(item.price)}
                  productSrc={item.image}
                  onClickBuyNow={handleClickBuyNow}
                  onClickItem={handleClickItem}
                />
              );
            })
          )}
      </div>
    </div>
  );
}
