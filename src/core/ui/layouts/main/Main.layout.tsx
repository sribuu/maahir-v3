import * as React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import NavigationBarComponent from "@/src/core/ui/components/navigation_bar/NavigationBar.component";
import Footer from "@/src/core/ui/components/footer";

export interface IMainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  const router = useRouter();
  const { data: menuData } = useQuery({
    queryKey: ["maahir-menu"],
    queryFn: fetchMaahirMenu,
  });
  const { data: socialMediaData } = useQuery({
    queryKey: ["maahir-social-media"],
    queryFn: fetchMaahirSocialMedia,
  });

  const variant: "transparent" | "normal" =
    router.pathname === "/" ? "transparent" : "normal";
  return (
    <main>
      <NavigationBarComponent menus={menuData} variant={variant} />
      {props.children}
      <Footer menus={menuData} socialMedia={socialMediaData} />
    </main>
  );
}
