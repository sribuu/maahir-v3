import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import NavigationBarComponent from "@/src/core/ui/components/navigation_bar/NavigationBar.component";
import Footer from "@/src/core/ui/components/footer";
import { ReactQueryKey, StorageQueryKey } from "@/src/core/lib/constants";
import { fetchCartItem } from "@/src/core/lib/storage";
import { ICart } from "@/src/core/lib/models";

export interface IMainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  const router = useRouter();
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
    <main>
      <NavigationBarComponent
        menus={menuData}
        variant={"normal"}
        cartData={cartData}
      />
      {props.children}
      <Footer menus={menuData} socialMedia={socialMediaData} />
    </main>
  );
}
