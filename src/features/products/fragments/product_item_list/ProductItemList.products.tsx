import { useContext } from "react";
import { useRouter } from "next/router";
import ItemCardProduct from "../item_card/ItemCard.product";
import clsx from "clsx";
import PaginationComponent from "@/src/core/ui/components/pagination/Pagination.component";
import { useProductsGetProductItems } from "../../hooks/useProducts";
import SkeletonItemCardProduct from "../skeleton_item_card/SkeletonItemCard.product";
import { ProductsContext } from "../../contexts/products/Products.context";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import ItemNotFoundProduct from "../item_not_found/ItemNotFound.product";
import ItemCountPaginationComponent from "@/src/core/ui/components/item_count_pagination/ItemCountPagination.component";
import { ProductsActionEnum } from "../../contexts/products/Products.types";
export interface IProductItemListProductsProps {}

export default function ProductItemListProducts(
  props: IProductItemListProductsProps
) {
  const router = useRouter();
  const { isLoading: isLoadingGetProductItems } = useProductsGetProductItems();
  const { state, dispatch } = useContext(ProductsContext);
  if (isLoadingGetProductItems) {
    const itemsCount = Array.from({ length: 16 }, (_, i) => i + 1);
    return (
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-2 w-full"
        )}
      >
        <div
          className={clsx(
            "grid justify-center justify-items-center",
            "max-w-[75rem] gap-x-[1.25rem] gap-y-[1.25rem]",
            "grid-cols-4"
          )}
        >
          {itemsCount.map((item) => (
            <SkeletonItemCardProduct key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (!state.items.length && !isLoadingGetProductItems) {
    return <ItemNotFoundProduct />;
  }

  const handleClickBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderProduct,
      query: { [RouterQueryKey.ProductId]: parseInt(e.currentTarget.id) },
    });
  };

  const handleClickItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.ProductDetail,
      query: {
        [RouterQueryKey.ProductId]: e.currentTarget.id,
      },
    });
  };

  const handleChangeCurrentPage = (data: number) => {
    dispatch({
      type: ProductsActionEnum.ChangeCurrentPage,
      payload: data,
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-center content-start justify-items-center",
        "gap-y-[3rem] w-full"
      )}
    >
      <div
        className={clsx(
          "grid justify-center justify-items-center",
          "max-w-[75rem] gap-x-[1.25rem] gap-y-[1.25rem]",
          "grid-cols-4"
        )}
      >
        {state.items.map((item, index) => (
          <ItemCardProduct
            key={index}
            id={String(item.id)}
            name={item.name}
            profitValue={item.profit}
            price={item.price}
            productSrc={item.image}
            onClickBuyNow={handleClickBuyNow}
            onClickItem={handleClickItem}
          />
        ))}
      </div>

      <div className={clsx("flex items-center justify-between", "w-full")}>
        <ItemCountPaginationComponent />
        <PaginationComponent onChangePage={handleChangeCurrentPage} />
      </div>
    </div>
  );
}
