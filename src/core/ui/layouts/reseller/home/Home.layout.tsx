import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";

import NavigationBarComponent from "../../../components/navigation_bar/NavigationBar.component";
import FooterComponent from "../../../components/footer/Footer.component";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { ICart } from "@/src/core/lib/models";
import { fetchCartItem } from "@/src/core/lib/storage";
import clsx from "clsx";
import { ResellerCartProvider } from "@/src/features/cart/contexts/cart/Cart.context";
import { useGlobalCartGetCartItems } from "@/src/features/cart/hooks/useGetCartItems";

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

  return (
    <ResellerCartProvider>
      <main
        className={clsx(
          "grid grid-cols-1",
          "w-full",
          "min-h-[100vh]",
          "relative"
        )}
      >
        <NavigationBarComponent menus={menuData} variant={props.variant} />
        {props.children}

        <FooterComponent menus={menuData} socialMedia={socialMediaData} />
      </main>
    </ResellerCartProvider>
  );
}
