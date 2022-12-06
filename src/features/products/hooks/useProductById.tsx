import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ProductReactQueryKey } from "../constants";
import { fetchProductGetProductById } from "../services/fetchGetProductById";
import { RouterQueryKey } from "@/src/core/lib/constants";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";

export const useProductGetProductByIdQuery = () => {
  const router = useRouter();
  const id = parseInt(String(router.query[RouterQueryKey.ProductId]));
  return useQuery<IProducts>([ProductReactQueryKey.GetProductById], () =>
    fetchProductGetProductById({
      id: id,
    })
  );
};

export const useProductItemDescriptionData = () => {
  const router = useRouter();
  const id = parseInt(String(router.query[RouterQueryKey.ProductId]));
  const { data, isLoading, ...rest } = useQuery<IProducts>(
    [ProductReactQueryKey.GetProductById],
    () =>
      fetchProductGetProductById({
        id: id,
      })
  );

  let transformedData = {
    coverImage: "",
    detailImage: [],
    itemNumber: 1,
    name: "",
    price: "-",
    unitSellingPrice: `-`,
    profitLabel: `-`,
    description: "-",
    categoryName: "",
    categoryId: 0,
    stock: 0,
    variant: ["Deep Blue", "Red", "White"],
  };

  if (isLoading) {
    return {
      transformedData: transformedData,
      ...rest,
    };
  }

  transformedData = {
    ...transformedData,
    coverImage: data?.image,
    detailImage: data?.detail_images,
    itemNumber: 1,
    name: data?.title,
    price: thousandSeparator(data?.price),
    unitSellingPrice: `Harga jual satuan ${thousandSeparator(
      data?.retail_price_min
    )} - ${thousandSeparator(data?.retail_price_max)}`,
    profitLabel: `Potensi keuntungan mulai dari ${thousandSeparator(
      data?.profit_value
    )}`,
    description: data?.description,
    categoryName: data?.category_name,
    categoryId: data?.category_id,
    stock: data?.stock,
    variant: ["Deep Blue", "Red", "White"],
  };
  return {
    transformedData: transformedData,
    isLoading: isLoading,
    ...rest,
  };
};
