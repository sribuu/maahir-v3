import Head from "next/head";
import { resellerHeaders } from "@/src/data/reseller/static";
import { PageKey } from "@/src/core/lib/constants";
import InformationPaymentContainer from "@/src/features/reseller/payment/containers/information/Information.payment";
import { PaymentInformationProvider } from "@/src/features/reseller/payment/contexts/information/PaymentInformation.context";

export default function InformationPaymentPage() {
  const headerData = resellerHeaders.filter(
    (item) => item.id === PageKey.Home
  )[0];
  return (
    <>
      <Head>
        <title>{headerData.title}</title>
        <meta name="description" content={headerData.description} />
      </Head>

      <PaymentInformationProvider>
        <InformationPaymentContainer />
      </PaymentInformationProvider>
    </>
  );
}
