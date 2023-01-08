import Head from "next/head";
import { resellerHeaders } from "@/src/data/reseller/static";
import { PageKey } from "@/src/core/lib/constants";
import { MultipleShipmentProvider } from "@/src/features/reseller/shipment/contexts/multiple/MultipleShipment.context";
import MultipleShipmentContainer from "@/src/features/reseller/shipment/containers/multiple/Multiple.shipment";

export default function MultipleShipmentPage() {
  const headerData = resellerHeaders.filter(
    (item) => item.id === PageKey.Home
  )[0];
  return (
    <>
      <Head>
        <title>{headerData.title}</title>
        <meta name="description" content={headerData.description} />
      </Head>

      <MultipleShipmentProvider>
        <MultipleShipmentContainer />
      </MultipleShipmentProvider>
    </>
  );
}
