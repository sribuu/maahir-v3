import * as React from "react";
import { socialMedia, resellerMenu } from "@/src/core/data/reseller/static";
import NavigationBarComponent from "@/src/core/ui/components/navigation_bar/NavigationBar.component";
import FooterComponent from "@/src/core/ui/components/footer/Footer.component";
import clsx from "clsx";
import { ResellerCartProvider } from "@/src/features/cart/contexts/cart/Cart.context";

export interface IHomeLayoutProps {
  children?: React.ReactNode;
  variant?: "transparent" | "normal";
}

export default function HomeLayout(props: IHomeLayoutProps) {
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
        <NavigationBarComponent menus={resellerMenu} variant={props.variant} />
        {props.children}

        <FooterComponent menus={resellerMenu} socialMedia={socialMedia} />
      </main>
    </ResellerCartProvider>
  );
}
