import { NextPageContext } from "next";
import * as React from "react";

export async function getStaticProps(context) {
  console.log(context, "ini context");
  return {
    props: {
      //
    },
  };
}

export interface IPaymentOrderPageProps {}

export default function PaymentOrderPage(props: IPaymentOrderPageProps) {
  return (
    <div>
      <div></div>
    </div>
  );
}
