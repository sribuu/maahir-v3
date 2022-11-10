import * as React from "react";
import NavigationBarComponent from "../../components/navigation_bar/NavigationBar.component";

export interface IMainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <main>
      <NavigationBarComponent />
      {props.children}
    </main>
  );
}
