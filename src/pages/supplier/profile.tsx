import * as React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import ManagementProfileContainer from "@/src/features/profile/containers/management/Management.profile";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { fetchBankList } from "@/src/core/lib/api/dynamic";
import { SupplierProfileProvider } from "@/src/features/profile/contexts/profile/Profile.context";

export interface ISupplierBalanceManagementPageProps {}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    await queryClient.prefetchQuery([ReactQueryKey.GetBankList], fetchBankList);
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

export default function SupplierBalanceManagementPage({ isErrorPrefetch }) {
  const header = {
    title: "Maahir | Profile",
    description: "Maahir Supplier Profile",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>
      <SupplierProfileProvider>
        <ManagementProfileContainer />
      </SupplierProfileProvider>
    </>
  );
}
