import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import FilterCardProduct from "../../fragments/filter_card/FilterCard.product";
import SkeletonItemCardProduct from "../../fragments/skeleton_item_card/SkeletonItemCard.product";
import ItemCardProduct from "../../fragments/item_card/ItemCard.product";
import SkeletonFilterCardProduct from "../../fragments/skeleton_filter_card/SkeletonFilterCard.product";
import {
  IProductsQueryParams,
  useProductsQuery,
} from "../../hooks/useProducts";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import { useProductCategoryQuery } from "../../hooks/useProductCategory";
import {
  usePriceCategoryData,
  usePriceCategoryQuery,
} from "../../hooks/usePriceCategory";
export interface IHomeProductContainerProps {}

export default function HomeProductContainer(
  props: IHomeProductContainerProps
) {
  const router = useRouter();
  const { ref, inView } = useInView();
  const pageContent = {
    title: "Produk jualan paling viral buat kamu",
    description:
      "Beli paket reseller di Maahir by Sribuu, dan dapatkan paket konten gratis!",
  };

  const [payload, setPayload] = useState<IProductsQueryParams>({
    page_param: 1,
  });
  const {
    data: productsData,
    fetchNextPage,
    isSuccess: isSuccessProductsData,
    isLoading: isLoadingProductDatas,
  } = useProductsQuery(payload);

  const {
    isSuccess: isSuccessProductCategoryData,
    isLoading: isLoadingProductCategoryData,
  } = useProductCategoryQuery();

  const {
    isSuccess: isSuccessPriceCategoryData,
    isLoading: isLoadingPriceCategoryData,
  } = usePriceCategoryQuery();

  const priceCategoryData = usePriceCategoryData();

  const itemsCount = Array.from({ length: 16 }, (_, i) => i + 1);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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

  const handleChangePriceCategory = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const filterPriceCategoryData = priceCategoryData.filter(
      (_, index) => index === parseInt(e.currentTarget.id)
    )[0];
    if (
      filterPriceCategoryData.name !== "Lebih dari Rp1.000.000" &&
      payload.min_price === filterPriceCategoryData.min &&
      payload.max_price &&
      filterPriceCategoryData.max
    ) {
      const newPayload = payload;
      delete newPayload.max_price;
      delete newPayload.min_price;
      setPayload({
        ...newPayload,
      });
    } else if (filterPriceCategoryData.name !== "Lebih dari Rp1.000.000") {
      setPayload({
        ...payload,
        min_price: filterPriceCategoryData.min,
        max_price: filterPriceCategoryData.max,
      });
    } else {
      // setPayload()
    }
  };
  const handleChangeProductCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      payload.category_id !== undefined &&
      payload.category_id === parseInt(e.currentTarget.id)
    ) {
      const newPayload = payload;
      delete newPayload.category_id;
      setPayload({ ...newPayload });
    } else {
      setPayload({ ...payload, category_id: parseInt(e.currentTarget.id) });
    }
  };
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[4rem] w-full pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-center content-start justify-items-center",
            "gap-y-2 w-full max-w-[1200px]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 justify-start content-start justify-items-start",
              "gap-y-2 max-w-[75rem] w-full"
            )}
          >
            <h1
              className={clsx(
                "text-[2.25rem] font-bold",
                "text-charleston-green"
              )}
            >
              {pageContent.title}
            </h1>
            <p className={clsx("text-base font-regular", "text-independence")}>
              {pageContent.description}
            </p>
          </div>
        </div>

        {/* body */}
        <div className={clsx("flex gap-[2rem]", "box-border max-w-[1200px]")}>
          {(isLoadingProductCategoryData || isLoadingPriceCategoryData) && (
            <SkeletonFilterCardProduct />
          )}

          {isSuccessPriceCategoryData && isSuccessProductCategoryData && (
            <FilterCardProduct
              onChangeProductCategory={handleChangeProductCategory}
              onChangePriceCategory={handleChangePriceCategory}
            />
          )}

          {/* loading */}
          {isLoadingProductDatas && (
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
                {itemsCount.map((item) => (
                  <SkeletonItemCardProduct key={item} />
                ))}
              </div>
            </div>
          )}

          {isSuccessProductsData && (
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
                {productsData.pages.map((page: IProducts[]) =>
                  page.map((item: IProducts, index) => {
                    return (
                      <ItemCardProduct
                        productRef={
                          index === productsData.pages.length * page.length - 1
                            ? ref
                            : null
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
          )}
        </div>
      </div>
    </MainLayout>
  );
}
