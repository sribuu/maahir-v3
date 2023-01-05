import * as React from "react";
import Head from "next/head";
import FAQContainer from "@/src/features/reseller/faq/containers/FAQ.container";

export interface IFAQPageProps {}

export default function FAQPage(props: IFAQPageProps) {
  const header = {
    title: "Maahir | FAQ",
    description: "Maahir | FAQ",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <FAQContainer />
    </>
  );
}
