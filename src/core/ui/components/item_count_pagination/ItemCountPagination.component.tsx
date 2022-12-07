import * as React from "react";
import clsx from "clsx";

export interface IItemCountPaginationComponentProps {
  firstIndexData: number;
  lastIndexData: number;
  totalItem: number;
}

ItemCountPaginationComponent.defaultProps = {
  totalItem: 160,
  firstIndexData: 1,
  lastIndexData: 12,
};

export default function ItemCountPaginationComponent(
  props: IItemCountPaginationComponentProps
) {
  return (
    <p className={clsx("text-[0.875rem] text-independence font-regular")}>
      {`Menampilkan ${props.firstIndexData} - ${props.lastIndexData} produk dari total ${props.totalItem} produk`}
    </p>
  );
}
