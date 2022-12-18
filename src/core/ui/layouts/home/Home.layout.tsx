import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";

import NavigationBarComponent from "../../components/navigation_bar/NavigationBar.component";
import FooterComponent from "../../components/footer/Footer.component";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { fetchCartItem } from "@/src/core/lib/storage";
import clsx from "clsx";

export interface IHomeLayoutProps {
  children?: React.ReactNode;
  variant?: "transparent" | "normal";
}

export default function HomeLayout(props: IHomeLayoutProps) {
  const { data: menuData } = useQuery({
    queryKey: [ReactQueryKey.GetMenu],
    queryFn: fetchMaahirMenu,
  });
  const { data: socialMediaData } = useQuery({
    queryKey: [ReactQueryKey.GetSocialMedia],
    queryFn: fetchMaahirSocialMedia,
  });

  const {
    data: cartData,
    isLoading: isLoadingCartData,
    isSuccess: isSuccessCartData,
  } = useQuery<ICart[]>({
    queryKey: [ReactQueryKey.GetCart],
    queryFn: fetchCartItem,
    enabled: typeof window !== "undefined",
  });

  return (
    <main
      className={clsx(
        "grid grid-cols-1",
        "w-full",
        "min-h-[100vh]",
        "relative"
      )}
    >
      <NavigationBarComponent
        menus={menuData}
        variant={props.variant}
        cartData={cartData}
      />
      {props.children}

      <FooterComponent menus={menuData} socialMedia={socialMediaData} />
    </main>
  );
}
