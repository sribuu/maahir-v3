import axios from "axios";
import { APIUrlPath } from "@/src/core/lib/constants";
export const fetchProductGetProductCategory = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetOptions}`,
      {
        params: {
          option_type: "PRODUCT_CATEGORY",
        },
      }
    )
    .then((res) => res.data);
