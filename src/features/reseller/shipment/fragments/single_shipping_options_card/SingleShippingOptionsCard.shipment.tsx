import { useContext } from "react";
import ShippingOptionsCardShipment from "../../components/shipping_options_card/ShippingOptionsCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";

export interface ISingleShippingOptionscardShipmentProps {}

export default function SingleShippingOptionscardShipment(
  props: ISingleShippingOptionscardShipmentProps
) {
  const { state } = useContext(SingleShipmentContext);

  return (
    <ShippingOptionsCardShipment
      disabled={!state.personal_information.filled.status}
      orders={state.orders.detail}
    />
  );
}
