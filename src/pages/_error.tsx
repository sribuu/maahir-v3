import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import clsx from "clsx";
import MainLayout from "../core/ui/layouts/main/Main.layout";
import ButtonComponent from "../core/ui/components/button/Button.component";
export interface IErrorPageProps {}

export default function ErrorPage(props: IErrorPageProps) {
  const router = useRouter();

  const header = {
    title: "Maahir | Page Error",
    description: "Maahir Page Error",
  };
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
              <img src={"/illustrations/page-error.svg"} />

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
                  {"500 - Kesalahan server internal"}
                </p>
                <p
                  className={clsx(
                    "text-[1rem] font-regular",
                    "text-independence",
                    "text-center"
                  )}
                >
                  {`Mohon maaf atas ketidaknyamanannya, kami sedang memperbaiki masalah. Silakan coba lagi di tahap selanjutnya`}
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
