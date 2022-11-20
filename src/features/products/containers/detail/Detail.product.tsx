import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ItemImageCardProduct from "../../fragments/item_image_card/ItemImageCard.product";
import ItemDescriptionCardProduct from "../../fragments/item_description_card/ItemDescriptionCard.product";
import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { ICart, IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { fetchAddToCart } from "@/src/core/lib/storage";

export interface IDetailProductContainerProps {}

export default function DetailProductContainer(
  props: IDetailProductContainerProps
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [itemNumber, setItemNumber] = useState(1);
  const { data: productByIdData, isLoading: isLoadingProductByIdData } =
    useQuery<IProducts>({
      queryKey: [ReactQueryKey.GetProductById],
      queryFn: () =>
        fetchProductById(
          parseInt(String(router.query[RouterQueryKey.ProductId]))
        ),
    });

  const {
    data: addToCartData,
    isSuccess: isSuccessAddToCart,
    isLoading: isLoadingAddToCart,
    mutate: mutateAddToCart,
  } = useMutation<ICart[], unknown, ICart, unknown>({
    mutationFn: (data: ICart) => {
      return fetchAddToCart(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([ReactQueryKey.AddCart], data);
    },
  });
  if (isLoadingProductByIdData) {
    return <div />;
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // router.push("/cart");
    const payload: ICart = {
      amount: itemNumber,
      ...productByIdData,
    };
    mutateAddToCart(payload);
  };

  const handleAddItemNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = itemNumber + 1;
    setItemNumber(result);
  };

  const handleSubstractItemNumber = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const result = itemNumber <= 0 ? itemNumber - 1 : 0;
    setItemNumber(result);
  };

  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[4rem] w-full pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div className={clsx("flex gap-[2rem]", "box-border max-w-[1200px]")}>
          <div>
            <ItemImageCardProduct
              productSrc={[
                productByIdData.image,
                productByIdData.image,
                productByIdData.image,
                productByIdData.image,
                productByIdData.image,
                productByIdData.image,
              ]}
            />
          </div>
          <div>
            <ItemDescriptionCardProduct
              itemNumber={itemNumber}
              name={productByIdData.title}
              price={thousandSeparator(productByIdData.price)}
              minPrice={thousandSeparator(productByIdData.retail_price_min)}
              maxPrice={thousandSeparator(productByIdData.retail_price_max)}
              profitValue={thousandSeparator(productByIdData.profit_value)}
              description={productByIdData.description}
              onAddToCart={handleAddToCart}
              onAddItemNumber={handleAddItemNumber}
              onSubstractItemNumber={handleSubstractItemNumber}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
