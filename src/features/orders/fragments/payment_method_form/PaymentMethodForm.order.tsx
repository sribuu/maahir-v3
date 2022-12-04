import { useEffect, useState } from "react";
import clsx from "clsx";
import PaymentMethodOptionOrder from "../payment_method_option/PaymentMethodOption.order";
import { usePaymentMethodData } from "../../hooks/usePaymentMethod";
export interface IPaymentMethodFormOrderProps {
  selected?: string;
  onSelect?: (data: string) => void;
}

PaymentMethodFormOrder.defaultProps = {
  selected: "",
};

export default function PaymentMethodFormOrder(
  props: IPaymentMethodFormOrderProps
) {
  const paymentMethodData = usePaymentMethodData();

  const [selected, setSelected] = useState("");
  const handleSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (props.onSelect) {
      props.onSelect(selected);
    }
  }, [selected]);

  //   mutate from props
  useEffect(() => {
    if (props.selected.length > 0) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  return (
    <form
      className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "py-[1.5rem] w-full")}
      onSubmit={handleSubmit}
    >
      {paymentMethodData !== undefined &&
        paymentMethodData.length > 0 &&
        paymentMethodData.map((paymentItem, index) => {
          return (
            <PaymentMethodOptionOrder
              key={index}
              selected={selected === String(paymentItem.id)}
              id={String(paymentItem.id)}
              logo={paymentItem.logo}
              name={paymentItem.name}
              onSelect={handleSelected}
            />
          );
        })}
    </form>
  );
}
