import * as React from "react";
import Link from "next/link";

export interface INavigationBarComponentProps {}

export default function NavigationBarComponent(
  props: INavigationBarComponentProps
) {
  const menus = [
    {
      name: "FAQ",
      link: "/faq",
    },
    {
      name: "Lihat Semua Produk",
      link: "/products",
    },
    {
      name: "Cek Orders",
      link: "/orders",
    },
  ];
  return (
    <nav>
      <div className={"flex justify-between"}>
        <img
          src={
            "https://sribuu.id/wp-content/uploads/2022/06/Logo-sribuu-gradient-01-768x178.png"
          }
          width={130}
          height={70}
          loading={"lazy"}
        />

        <div className={"flex gap-16"}>
          {menus.map((item, index) => (
            <Link href={item.link} target={"_blank"}>
              <button
                key={index}
                className={
                  "px-4 py-2 border-green-700 border bg-yellow-300 rounded-lg"
                }
              >
                <p>{item.name}</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
