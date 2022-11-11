import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import NavigationBarComponent from "@/src/core/ui/components/navigation_bar/NavigationBar.component";
import Footer from "@/src/core/ui/components/footer";

export interface IMainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  const { data: menuData } = useQuery({
    queryKey: ["maahir-menu"],
    queryFn: fetchMaahirMenu,
  });
  const { data: socialMediaData } = useQuery({
    queryKey: ["maahir-social-media"],
    queryFn: fetchMaahirSocialMedia,
  });

  return (
    <main>
      <NavigationBarComponent menus={menuData} />
      {props.children}
      <Footer menus={menuData} socialMedia={socialMediaData} />
    </main>
  );
}
