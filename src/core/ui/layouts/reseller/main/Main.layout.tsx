import NavigationBarComponent from "@/src/core/ui/components/navigation_bar/NavigationBar.component";
import Footer from "@/src/core/ui/components/footer";
import { ResellerCartProvider } from "@/src/features/reseller/cart/contexts/cart/Cart.context";
import { resellerMenu, socialMedia } from "@/src/data/reseller/static";

export interface IMainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <ResellerCartProvider>
      <main>
        <NavigationBarComponent menus={resellerMenu} variant={"normal"} />
        {props.children}
        <Footer menus={resellerMenu} socialMedia={socialMedia} />
      </main>
    </ResellerCartProvider>
  );
}
