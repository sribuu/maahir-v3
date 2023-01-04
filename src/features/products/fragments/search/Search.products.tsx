import React, { useContext } from "react";
import clsx from "clsx";
import SearchInputComponent from "@/src/core/ui/components/search_input/SearchInput.component";
import { ProductsContext } from "../../contexts/products/Products.context";
import { ProductsActionEnum } from "../../contexts/products/Products.types";

export interface ISearchProductsProps {}

export default function SearchProducts(props: ISearchProductsProps) {
  const { state, dispatch } = useContext(ProductsContext);
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ProductsActionEnum.SetSearchValue,
      payload: e.currentTarget.value,
    });
  };

  const handleClickSearch = () => {
    dispatch({
      type: ProductsActionEnum.SetFindItemTrue,
    });
  };

  const handleKeyUpSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch({
        type: ProductsActionEnum.SetFindItemTrue,
      });
    }
  };
  return (
    <div className={clsx("hidden sm:grid")}>
      <SearchInputComponent
        placeholder={"Cari produk disini"}
        value={state.search.value}
        onChange={handleChangeSearch}
        onSearch={handleClickSearch}
        onKeyUp={handleKeyUpSearch}
      />
    </div>
  );
}
