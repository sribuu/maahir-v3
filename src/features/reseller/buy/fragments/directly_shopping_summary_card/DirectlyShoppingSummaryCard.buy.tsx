import { useContext } from "react";
import { BuyDirectlyContext } from "@/src/features/reseller/buy/contexts/BuyDirectly.context";
import ShoppingSummaryCardBuy from "../../components/shopping_summary_card/ShoppingSummaryCard.buy";

export interface IDirectlyShoppingSummaryCardBuyProps {}

export default function DirectlyShoppingSummaryCardBuy(
  props: IDirectlyShoppingSummaryCardBuyProps
) {
  const { state, dispatch } = useContext(BuyDirectlyContext);
  return (
    <ShoppingSummaryCardBuy
      totalQuantity={state.calculator.total_quantity}
      totalPrice={state.calculator.total_price}
      totalPayment={state.calculator.total_payment}
    />
  );
}
