import * as React from "react";
import BillCardShipment from "@/src/features/reseller/shipment/components/bill_card/BillCard.shipment";

export interface IMultipleBillShipmentProps {}

export default function MultipleBillShipment(
  props: IMultipleBillShipmentProps
) {
  return (
    <BillCardShipment
      title={"Pesanan Kamu"}
      totalPriceText={"Total Harga"}
      quantity={"6 Barang"}
      totalPrice={"Rp2.000.000"}
      servicePriceText={"Biaya Penanganan"}
      servicePrice={"Rp2.0000"}
      shipmentPriceText={"Total Biaya Pengiriman"}
      shipmentPrice={"Rp10.0000"}
      totalPaymentText={"Total Pembayaran"}
      totalPayment={"Rp2.012.000"}
      ctaConfirmationText={"Konfirmasi Pesanan"}
      actionEnabled={false}
    />
  );
}
