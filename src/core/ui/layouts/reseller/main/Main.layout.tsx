import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import NavigationBarComponent from "@/src/core/ui/components/navigation_bar/NavigationBar.component";
import Footer from "@/src/core/ui/components/footer";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { ResellerCartProvider } from "@/src/features/cart/contexts/cart/Cart.context";

export interface IMainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
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
      <main>
        <NavigationBarComponent menus={menuData} variant={"normal"} />
        {props.children}
        <Footer menus={menuData} socialMedia={socialMediaData} />
      </main>
    </ResellerCartProvider>
  );
}
