import * as React from "react";
import clsx from "clsx";

export interface IAvailableStockProductProps {
  stock?: number;
}

AvailableStockProduct.defaultProps = {
  stock: 0,
};

export default function AvailableStockProduct(
  props: IAvailableStockProductProps
) {
  const availableStockText =
    props.stock <= 5 ? `Sisa stock: ${props.stock}` : "";
  return (
    <p
      className={clsx(
        "text-[1rem] font-regular",
        props.stock <= 5 ? "text-tart-orange" : "text-taupe-gray"
      )}
    >
      {availableStockText}
    </p>
  );
}
