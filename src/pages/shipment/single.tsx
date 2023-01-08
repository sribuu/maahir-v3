import Head from "next/head";
import { resellerHeaders } from "@/src/data/reseller/static";
import { PageKey } from "@/src/core/lib/constants";
import SingleShipmentContainer from "@/src/features/reseller/shipment/containers/single/Single.shipment";
import { SingleShipmentProvider } from "@/src/features/reseller/shipment/contexts/single/SingleShipment.context";

export default function SingleShipmentPage() {
  const headerData = resellerHeaders.filter(
    (item) => item.id === PageKey.Home
  )[0];
  return (
    <>
      <Head>
        <title>{headerData.title}</title>
        <meta name="description" content={headerData.description} />
      </Head>

      <SingleShipmentProvider>
        <SingleShipmentContainer />
      </SingleShipmentProvider>
    </>
  );
}
