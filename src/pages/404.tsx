import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import clsx from "clsx";
import MainLayout from "../core/ui/layouts/reseller/main/Main.layout";
import ButtonComponent from "../core/ui/components/button/Button.component";
export interface IPageNotFoundProps {}

export default function PageNotFound(props: IPageNotFoundProps) {
  const header = {
    title: "Maahir | Page Not Found",
    description: "Maahir Page Not Found",
  };
  const router = useRouter();
  const handleClickBackToHomePage = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>
      <MainLayout>
        <div
          className={clsx(
            "grid grid-cols-1 justify-center content-start justify-items-center",
            "gap-y-[3rem] w-full pt-[8.875rem] pb-[10rem] min-h-[41.75rem]",
            "bg-gradient-to-r from-white to-mint-cream"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 justify-center content-start justify-items-center",
              "gap-y-[3rem] w-full max-w-[340px]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 justify-center justify-items-center",
                "gap-y-[2rem]"
              )}
            >
              <img src={"/illustrations/page-not-found.svg"} />

              <div
                className={clsx(
                  "grid grid-cols-1 justify-center justify-items-center",
                  "gap-y-[0.75rem]"
                )}
              >
                <p
                  className={clsx(
                    "text-[1.5rem] font-bold",
                    "text-charleston-green"
                  )}
                >
                  {"Halaman tidak ditemukan"}
                </p>
                <p
                  className={clsx(
                    "text-[1rem] font-regular",
                    "text-independence",
                    "text-center"
                  )}
                >
                  {`Maaf, halaman yang anda tuju tidak ditemukan. Kami sarankan anda kembali ke beranda.`}
                </p>
              </div>
            </div>

            <ButtonComponent
              intent={"primary"}
              onClick={handleClickBackToHomePage}
            >
              {"Kembali Ke Beranda"}
            </ButtonComponent>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
