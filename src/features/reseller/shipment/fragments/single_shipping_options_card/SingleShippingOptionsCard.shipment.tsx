import { useContext } from "react";
import ShippingOptionsCardShipment from "../../components/shipping_options_card/ShippingOptionsCard.shipment";
import { SingleShipmentContext } from "../../contexts/single/SingleShipment.context";
import { SingleShipmentActionEnum } from "../../contexts/single/SingleShipment.types";
import { useSingleGetShipment } from "../../hooks/useGetShipment.shipment";

export interface ISingleShippingOptionscardShipmentProps {}

export default function SingleShippingOptionscardShipment(
  props: ISingleShippingOptionscardShipmentProps
) {
  const { isLoading } = useSingleGetShipment();
  const { state, dispatch } = useContext(SingleShipmentContext);

  const handleSelect = (value: string, index: number) => {
    dispatch({
      type: SingleShipmentActionEnum.SetShippingValue,
      payload: {
        id: value,
        index: index,
      },
    });
  };
  return (
    <ShippingOptionsCardShipment
      orders={state.orders.detail}
      onSelect={handleSelect}
    />
  );
}
