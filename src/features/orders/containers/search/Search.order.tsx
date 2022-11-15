import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import useOrderIdForm from "@/src/core/hooks/form/useOrderIdForm";
import HeroSearchOrder from "../../fragments/hero_search/HeroSearch.order";
import { fetchOrderById } from "@/src/core/lib/api/dynamic";
import CheckOrderCardComponent from "@/src/core/ui/components/check_order_card/CheckOrderCard.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { IOrder } from "@/src/core/lib/models";
import {
  orderStatusFormatters,
  thousandSeparator,
} from "@/src/core/utils/formatters";
import moment from "moment";
import {
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";

export interface ISearchOrderContainerProps {}

export default function SearchOrderContainer(
  props: ISearchOrderContainerProps
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const initialOrderId =
    router.query[RouterQueryKey.OrderCode] !== undefined
      ? String(router.query[RouterQueryKey.OrderCode])
      : "";
  const { value: orderId, onChange: onChangeOrderId } =
    useOrderIdForm(initialOrderId);
  const initialState = router.query[RouterQueryKey.OrderCode] === undefined;
  const {
    data: orderData,
    isLoading: isLoadingOrderData,
    error,
    isError: isErrorOrderData,
    isSuccess: isSuccessOrderData,
    isStale: isStaleOrderData,
    isRefetching: isRefetchingOrderData,
  } = useQuery<IOrder>({
    queryKey: ["teuing", String(router.query[RouterQueryKey.OrderCode])],
    queryFn: () =>
      fetchOrderById(String(router.query[RouterQueryKey.OrderCode])),
    enabled: !!router.query[RouterQueryKey.OrderCode],
    staleTime: 0,
    cacheTime: 0,
    retry: 0,
  });

  const {
    data: orderMutationData,
    isError: orderMutationIsError,
    isSuccess: orderMutationIsSuccess,
    isLoading: orderMutationIsLoading,
    mutate: orderMutate,
  } = useMutation<IOrder | undefined, unknown, string, unknown>({
    mutationFn: (data: string) => {
      return fetchOrderById(data);
    },
    onSettled() {
      queryClient.invalidateQueries(["teuing"]);
    },
  });

  const handleChangeOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeOrderId(e.target.value);
  };
  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    // orderMutate(orderId);
    router.push({
      pathname: RouterPathName.OrderCheckByCode,
      query: {
        [RouterQueryKey.OrderCode]: orderId,
      },
    });
  };

  // console.log("ini mutation", orderMutationIsError, orderMutationData);
  console.log(
    "ini order",
    isErrorOrderData,
    "error",
    isLoadingOrderData,
    "loading",
    isSuccessOrderData,
    "success"
  );
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-[1.5rem] w-full pt-[8.875rem] pb-[10rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-start content-start justify-items-start items-start",
            "gap-y-[1.5rem] max-w-[75rem] w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1.75rem] font-bold",
              "text-charleston-green"
            )}
          >
            {"Cek Order Kamu"}
          </p>
          {/* search textfield */}
          <TextfieldComponent
            value={orderId}
            placeholder={"Masukkan ID ordermu... "}
            onChange={handleChangeOrderId}
            endAddornment={
              <button
                className={clsx(
                  "grid place-content-center place-items-center",
                  "w-[2rem] h-[2rem] rounded-[0.375rem]",
                  "bg-ocean-boat-blue"
                )}
                onClick={handleClickSearch}
              >
                <img src={"/icons/search.svg"} />
              </button>
            }
          />
          <div
            className={clsx(
              "grid grid-cols-1 justify-center justify-items-center",
              "gap-y-[4rem] w-full"
            )}
          >
            {/* start */}
            {/* {!orderMutationIsError &&
              !orderMutationIsLoading &&
              !orderMutationIsSuccess && (
                <HeroSearchOrder
                  illustration={"/illustrations/start-search-order.svg"}
                  message={"Mulai pencarian mu dengan mengetikkan keyboard"}
                  description={
                    'Misalnya, ketik "ID023456" untuk mencari semua yang terkait dengannya'
                  }
                />
              )} */}

            {initialState && (
              <HeroSearchOrder
                illustration={"/illustrations/start-search-order.svg"}
                message={"Mulai pencarian mu dengan mengetikkan keyboard"}
                description={
                  'Misalnya, ketik "ID023456" untuk mencari semua yang terkait dengannya'
                }
              />
            )}
            {!isErrorOrderData &&
              !isLoadingOrderData &&
              !isSuccessOrderData && (
                <HeroSearchOrder
                  illustration={"/illustrations/start-search-order.svg"}
                  message={"Mulai pencarian mu dengan mengetikkan keyboard"}
                  description={
                    'Misalnya, ketik "ID023456" untuk mencari semua yang terkait dengannya'
                  }
                />
              )}

            {/* not empty */}
            {/* {orderMutationIsSuccess && (
              <CheckOrderCardComponent
                name={orderMutationData.product.title}
                productImage={orderMutationData.product.image}
                price={thousandSeparator(orderMutationData.price)}
                maxPrice={thousandSeparator(
                  orderMutationData.product.retail_price_max
                )}
                minPrice={thousandSeparator(
                  orderMutationData.product.retail_price_min
                )}
                orderId={orderMutationData.order_code}
                statusColor={orderStatusFormatters.statusColor(
                  orderMutationData.status
                )}
                orderStatus={orderStatusFormatters.statusName(
                  orderMutationData.status
                )}
                statusIcon={orderStatusFormatters.statusIcon(
                  orderMutationData.status
                )}
                orderDate={`${moment(
                  orderMutationData.payment.payment_method.created_at
                ).format("DD MMMM YYYY - hh:mm")} WIB`}
              />
            )} */}
            {isSuccessOrderData && (
              <CheckOrderCardComponent
                name={orderData.product.title}
                productImage={orderData.product.image}
                price={thousandSeparator(orderData.price)}
                maxPrice={thousandSeparator(orderData.product.retail_price_max)}
                minPrice={thousandSeparator(orderData.product.retail_price_min)}
                orderId={orderData.order_code}
                statusColor={orderStatusFormatters.statusColor(
                  orderData.status
                )}
                orderStatus={orderStatusFormatters.statusName(orderData.status)}
                statusIcon={orderStatusFormatters.statusIcon(orderData.status)}
                orderDate={`${moment(
                  orderData.payment.payment_method.created_at
                ).format("DD MMMM YYYY - hh:mm")} WIB`}
              />
            )}

            {/* empty */}
            {/* {orderMutationIsError && (
              <HeroSearchOrder
                illustration={"/illustrations/search-not-found-order.svg"}
                message={"Tidak ada produk yang ditemukan"}
                description={
                  "Coba sesuaikan ID pencarianmu untuk menemukan apa yang kamu cari"
                }
              />
            )} */}
            {isErrorOrderData && (
              <HeroSearchOrder
                illustration={"/illustrations/search-not-found-order.svg"}
                message={"Tidak ada produk yang ditemukan"}
                description={
                  "Coba sesuaikan ID pencarianmu untuk menemukan apa yang kamu cari"
                }
              />
            )}

            {/* call center */}
            <div
              className={clsx(
                "grid grid-cols-1 justify-center justify-items-center",
                "gap-y-[1.5rem] w-full"
              )}
            >
              <p
                className={clsx(
                  "text-[1.25rem] text-dark-charcoal font-regular"
                )}
              >
                {"Ada pertanyaan soal order kamu?"}
              </p>
              <ButtonComponent intent={"primary"}>
                {"Hubungi Sribuu"}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
