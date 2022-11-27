import * as React from "react";
import Head from "next/head";
import LoginAuthContainer from "@/src/features/auth/containers/login/Login.auth";

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const header = {
    title: "Maahir | Login",
    description: "Maahir Login",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>
      <LoginAuthContainer />
    </>
  );
}