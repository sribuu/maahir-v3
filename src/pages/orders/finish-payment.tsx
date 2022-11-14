import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import {
  fetchBuyProduct,
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import FinishPaymentOrderContainer from "@/src/features/orders/containers/finish_payment/FinishPayment.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    // STATIC
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetSocialMedia],
      fetchMaahirSocialMedia
    );

    // DYNAMIC
    // product
    await queryClient.prefetchQuery([ReactQueryKey.GetProductById], () =>
      fetchProductById(
        parseInt(String(context.query[RouterQueryKey.ProductId]))
      )
    );
    // payment-method
    await queryClient.prefetchQuery([ReactQueryKey.GetPaymentMethod], () =>
      fetchPaymentMethod()
    );
    // create-order
    await queryClient.prefetchQuery([ReactQueryKey.GetPaymentMethod], () =>
      fetchBuyProduct({
        name: String(context.query[RouterQueryKey.OrderName]),
        email: String(context.query[RouterQueryKey.OrderEmail]),
        phone_number: String(context.query[RouterQueryKey.OrderPhoneNumber]),
        product_id: parseInt(String(context.query[RouterQueryKey.ProductId])),
        quantity: parseInt(
          String(context.query[RouterQueryKey.ProductQuantity])
        ),
        kecamatan: String(context.query[RouterQueryKey.OrderDistrict]),
        address: String(context.query[RouterQueryKey.OrderAddress]),
        province: String(context.query[RouterQueryKey.OrderProvince]),
        postal_code: String(context.query[RouterQueryKey.OrderPostalCode]),
        payment_method_id: parseInt(
          String(context.query[RouterQueryKey.PaymentMethodId])
        ),
      })
    );
  } catch (e) {
    isError = true;
  }

  return {
    props: {
      isErrorPrefetch: isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export interface IFinishPaymentOrderPageProps {}

export default function FinishPaymentOrderPage(
  props: IFinishPaymentOrderPageProps
) {
  const header = {
    title: "Maahir | Selesaikan Pembayaran",
    description: "Maahir | Selesaikan Pembayaran",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <FinishPaymentOrderContainer />
    </>
  );
}
