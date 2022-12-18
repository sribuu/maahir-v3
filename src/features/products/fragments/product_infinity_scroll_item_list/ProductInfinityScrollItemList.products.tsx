import { useContext, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import ItemCardProduct from "../item_card/ItemCard.product";
import clsx from "clsx";
import PaginationComponent from "@/src/core/ui/components/pagination/Pagination.component";
import { useProductsInfinityListGetProductItems } from "../../hooks/useProductsItem";
import SkeletonItemCardProduct from "../skeleton_item_card/SkeletonItemCard.product";
import { ProductsContext } from "../../contexts/products/Products.context";
import { RouterPathName, RouterQueryKey } from "@/src/core/lib/constants";
import ItemNotFoundProduct from "../item_not_found/ItemNotFound.product";
import ItemCountPaginationComponent from "@/src/core/ui/components/item_count_pagination/ItemCountPagination.component";
import { ProductsActionEnum } from "../../contexts/products/Products.types";
import { useProductsAddItemToCart } from "../../hooks/useProductCart";
export interface IProductInfinityScrollItemListProductsProps {}

export default function ProductInfinityScrollItemListProducts(
  props: IProductInfinityScrollItemListProductsProps
) {
  const router = useRouter();
  const { ref, inView } = useInView();

  const { isLoading: isLoadingGetProductItems, fetchNextPage } =
    useProductsInfinityListGetProductItems();
  const { mutate: addProductToCart } = useProductsAddItemToCart();
  const { state, dispatch } = useContext(ProductsContext);

  const isGetProductItemsEmpty =
    !state.items.length && !isLoadingGetProductItems;

  useEffect(() => {
    if (inView && !isLoadingGetProductItems && !isGetProductItemsEmpty) {
      fetchNextPage();
    }
  }, [inView]);

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
            "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {itemsCount.map((item) => (
            <SkeletonItemCardProduct key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (isGetProductItemsEmpty) {
    return <ItemNotFoundProduct />;
  }

  const handleClickBuyNow = (data: number) => {
    router.push({
      pathname: RouterPathName.OrderProduct,
      query: { [RouterQueryKey.ProductId]: data },
    });
  };

  const handleClickItem = (data: number) => {
    router.push({
      pathname: RouterPathName.ProductDetail,
      query: {
        [RouterQueryKey.ProductId]: data,
      },
    });
  };

  const handleChangeCurrentPage = (data: number) => {
    dispatch({
      type: ProductsActionEnum.ChangeCurrentPage,
      payload: data,
    });
  };

  const handleAddToCart = (data: number) => {
    addProductToCart(data);
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
          "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div ref={ref} className={clsx("opacity-0")}>
        {"Check Bottom"}
      </div>

      <div
        className={clsx(
          "hidden sm:flex",
          "items-center justify-between",
          "w-full"
        )}
      >
        <ItemCountPaginationComponent
          firstIndexData={state.item_counts.first_item_index}
          lastIndexData={state.item_counts.last_item_index}
          totalItem={state.item_counts.total}
        />
        <PaginationComponent
          sibblingCount={1}
          currentPage={state.pagination.current_page}
          totalPage={state.pagination.total_page}
          onChangePage={handleChangeCurrentPage}
        />
      </div>
    </div>
  );
}
