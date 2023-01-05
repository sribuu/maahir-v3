import { useState, useEffect } from "react";
// export const useBuyItemNow = () => {
//   const [buyNowItem, setBuyNowItem] = useState({
//     quantity: 1,
//     notes: "",
//   });
//   const onSubstract = (data: number) => {
//     setBuyNowItem((state) => (state = { ...state, quantity: data }));
//   };
//   const onAdd = (data: number) => {
//     setBuyNowItem((state) => (state = { ...state, quantity: data }));
//   };
//   const onChangeNotes = (data: string) => {
//     setBuyNowItem((state) => (state = { ...state, notes: data }));
//   };

//   return {
//     buyNowItem,
//     onSubstract,
//     onAdd,
//     onChangeNotes,
//   };
// };

export const useShoppingSummary = (item: {
  quantity: number;
  price: number;
}) => {
  const [shoppingSummary, setShoppingSummary] = useState({
    totalPrice: 0,
    subTotalPrice: 0,
  });
  useEffect(() => {
    setShoppingSummary({
      ...shoppingSummary,
      subTotalPrice: item.quantity * item.price,
      totalPrice: item.quantity * item.price,
    });
  }, [item.quantity]);
  return {
    shoppingSummary,
  };
};
