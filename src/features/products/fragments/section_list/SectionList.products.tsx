import { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ProductCardComponent from "@/src/core/ui/components/product_card/ProductCard.component";
import { fetchInfinityListProducts } from "@/src/core/lib/api/dynamic";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import {
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
export interface ISectionListsProductsProps {}

export default function SectionListProducts(props: ISectionListsProductsProps) {
  const { ref, inView } = useInView();
  const router = useRouter();

  const { data, isFetching, fetchNextPage } = useInfiniteQuery<
    IProducts[],
    unknown,
    IProducts[],
    string[]
  >(
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderProduct,
      query: { [RouterQueryKey.ProductId]: parseInt(e.currentTarget.id) },
    });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  //   TODO: need to be refactor
  if (isFetching) {
    return <div />;
  }

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
          "max-w-[75rem] gap-x-8 gap-y-9",
          ":xs-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        )}
      >
        {data.pages.map((page: IProducts[]) =>
          page.map((item: IProducts, index) => {
            return (
              <ProductCardComponent
                productRef={
                  index === data.pages.length * page.length - 1 ? ref : null
                }
                key={index}
                id={String(item.id)}
                name={item.title}
                description={item.description}
                price={thousandSeparator(item.price)}
                productSrc={item.image}
                onClick={handleClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
