import React, { useState } from "react";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import useOrderIdForm from "@/src/core/hooks/form/useOrderIdForm";
import HeroSearchOrder from "../../fragments/hero_search/HeroSearch.order";
import { fetchOrderById } from "@/src/core/lib/api/dynamic";
import CheckOrderCardComponent from "@/src/core/ui/components/check_order_card/CheckOrderCard.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { IOrder } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import moment from "moment";

export interface ISearchOrderContainerProps {}

export default function SearchOrderContainer(
  props: ISearchOrderContainerProps
) {
  const queryClient = useQueryClient();

  const {
    data: orderData,
    mutate: searchOrder,
    isError: isErrorOrderData,
  } = useMutation<IOrder | undefined, unknown, string, unknown>({
    mutationFn: (data: string) => {
      return fetchOrderById(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], data);
    },
  });

  const { value: orderId, onChange: onChangeOrderId } = useOrderIdForm();

  const handleChangeOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeOrderId(e.target.value);
  };
  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    searchOrder(orderId);
  };

  console.log(isErrorOrderData, "ini error order data");
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
            {orderData === undefined && !isErrorOrderData && (
              <HeroSearchOrder
                illustration={"/illustrations/start-search-order.svg"}
                message={"Mulai pencarian mu dengan mengetikkan keyboard"}
                description={
                  'Misalnya, ketik "ID023456" untuk mencari semua yang terkait dengannya'
                }
              />
            )}

            {/* not empty */}
            {orderData !== undefined && !isErrorOrderData && (
              <CheckOrderCardComponent
                name={orderData.product.title}
                productImage={orderData.product.image}
                price={thousandSeparator(orderData.price)}
                maxPrice={thousandSeparator(orderData.product.retail_price_max)}
                minPrice={thousandSeparator(orderData.product.retail_price_min)}
                orderId={orderData.order_code}
                orderStatus={orderData.status}
                orderDate={`${moment(
                  orderData.payment.payment_method.created_at
                ).format("DD MMMM YYYY - hh:mm")} WIB`}
              />
            )}

            {/* empty */}
            {isErrorOrderData && orderData === undefined && (
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
