import * as React from "react";
import Head from "next/head";
import ManagementProfileContainer from "@/src/features/profile/containers/management/Management.profile";
import { ProfileUpdateProvider } from "@/src/features/profile/contexts/update/ProfileUpdate.context";

export interface ISupplierProfileManagementPageProps {}

export default function SupplierProfileManagementPage(
  props: ISupplierProfileManagementPageProps
) {
  const header = {
    title: "Maahir | Beranda",
    description: "Maahir Beranda",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>
      <ProfileUpdateProvider>
        <ManagementProfileContainer />
      </ProfileUpdateProvider>
    </>
  );
}
