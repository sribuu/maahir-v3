import * as React from "react";
import PaymentSummaryOrder from "@/src/features/orders/containers/payment_summary/PaymentSummary.order";

export async function getServerSideProps(context) {
  console.log(context.query.email, "ini context");
  return {
    props: {
      //
    },
  };
}
export interface IOrderSummaryPageProps {}

export default function OrderSummaryPage(props: IOrderSummaryPageProps) {
  return <PaymentSummaryOrder />;
}
