import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import ButtonComponent from "../../components/button/Button.component";
import MenuDropdownComponent from "../../components/menu_dropdown/MenuDropdown.component";
export interface ISupplierLayoutProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  header?: {
    name?: string;
    description?: string;
  };
}
SupplierLayout.defaultProps = {
  header: {
    name: "",
    description: "",
  },
};

export default function SupplierLayout(props: ISupplierLayoutProps) {
  const router = useRouter();

  const menu = [
    {
      id: "beranda",
      name: "Beranda",
      defaultIcon: "/icons/home-inactive.svg",
      activeIcon: "/icons/home-active.svg",
      link: "/supplier/beranda",
    },
    {
      id: "kelola-produk",
      name: "Kelola Produk",
      defaultIcon: "/icons/shopping-bag-inactive.svg",
      activeIcon: "/icons/shopping-bag-active.svg",
      link: "/supplier/kelola-produk",
    },
    {
      id: "kelola-pesanan",
      name: "Kelola Pesanan",
      defaultIcon: "/icons/receipt-inactive.svg",
      activeIcon: "/icons/receipt-active.svg",
      link: "/supplier/kelola-pesanan",
    },
    {
      id: "kelola-saldo",
      name: "Kelola Saldo",
      defaultIcon: "/icons/wallet-inactive.svg",
      activeIcon: "/icons/wallet-active.svg",
      link: "/supplier/kelola-saldo",
    },
  ];
  const handleClickRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(
      menu.filter((_, index) => index === parseInt(e.currentTarget.id))[0].link
    );
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-[248px_1fr]",
        "w-full min-w-[100vw] min-h-[100vh]",
        "bg-ghost-white-2"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-items-start place-content-start ",
          "p-[1.5rem] max-w-[248px]",
          "bg-white"
        )}
      >
        <img
          src={"/logo/maahir-full.svg"}
          className={clsx("w-[220px] h-[4rem]")}
        />

        <div
          className={clsx(
            "grid grid-cols-1 items-center content-center justify-start justify-items-start",
            "gap-y-[1rem]"
          )}
        >
          {menu.map((item, index) => (
            <button
              id={String(index)}
              key={index}
              className={clsx(
                "flex gap-[1rem] items-center justify-start",
                "p-[1rem] rounded-[1rem]"
              )}
              onClick={handleClickRoute}
            >
              <img
                src={
                  item.link.includes(router.pathname)
                    ? item.activeIcon
                    : item.defaultIcon
                }
              />
              <p
                className={clsx(
                  "text-[1rem]",
                  item.link.includes(router.pathname)
                    ? "font-bold"
                    : "font-regular",
                  item.link.includes(router.pathname)
                    ? "text-ocean-boat-blue"
                    : "text-taupe-gray"
                )}
              >
                {item.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* right navbar */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[2rem] place-content-start place-items-start",
          "p-[2rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "flex justify-between items-center gap-x-[4.5rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.25rem]"
            )}
          >
            <h1 className={"text-[1.75rem] font-bold text-charleston-green"}>
              {props.header.name}
            </h1>
            <p className={"text-[1rem] font-regular text-taupe-gray"}>
              {props.header.description}
            </p>
          </div>

          {/* avatar */}
          <div className={clsx("flex justify-end items-center gap-x-[1rem]")}>
            <p className={"text-[1rem] font-bold text-independence"}>
              {"PT. Lorem Ipsum"}
            </p>
            <MenuDropdownComponent />
            {/* <button
              className={clsx("flex justify-end items-center gap-x-[0.5rem]")}
            >
              <div
                className={clsx(
                  "flex justify-center items-center",
                  "w-[40px] h-[40px] rounded-[50%]",
                  "bg-mauve",
                  "box-border"
                )}
              >
                <p className={clsx("text-[1.5rem] text-bold text-white")}>
                  {"P"}
                </p>
              </div>

              <img
                src={"/icons/chevron-down-black.svg"}
                width={20}
                height={20}
              />
            </button> */}
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
}
