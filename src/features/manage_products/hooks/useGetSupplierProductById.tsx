import { RouterQueryKey } from "@/src/core/lib/constants";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { EditSupplierProductReactQueryKey } from "../constants";
import { EditSupplierProductContext } from "../contexts/edit/EditSupplierProduct.context";
import { EditSupplierProductActionEnum } from "../contexts/edit/EditSupplierProduct.types";
import { IGetSupplierProductByIdRequest } from "../models/supplier_product_by_id";
import { fetchAddSupplierProductGetProductCategory } from "../services/fetchGetProductCategory";
import { fetchGetSupplierProductById } from "../services/fetchGetSupplierProductById";

// Edit
export const useEditSupplierProductsGetSupplierProductById = () => {
  const router = useRouter();
  const id = parseInt(String(router.query[RouterQueryKey.ProductId]));
  const payload: IGetSupplierProductByIdRequest = {
    id: id,
  };
  const { dispatch } = useContext(EditSupplierProductContext);
  const query = useQuery<IProducts>(
    [EditSupplierProductReactQueryKey.GetProductById, payload],
    () => {
      return fetchGetSupplierProductById(payload);
    }
  );
  useEffect(() => {
    if (!query.isFetching) {
      dispatch({
        type: EditSupplierProductActionEnum.SetName,
        payload: query.data.title,
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetCategory,
        payload: query.data.category_name,
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetLength,
        payload: thousandSeparator(query.data.length),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetWidth,
        payload: thousandSeparator(query.data.width),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetHeight,
        payload: thousandSeparator(query.data.height),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetWeight,
        payload: thousandSeparator(query.data.weight),
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetDescription,
        payload: query.data.description,
      });
      dispatch({
        type: EditSupplierProductActionEnum.SetAvailability,
        payload: query.data.is_show ? "Tampilkan" : "Sembunyikan",
      });
      //  TODO: images and detail images
      //  TODO: variants
    }
  }, [query.isFetching]);

  return query;
};
