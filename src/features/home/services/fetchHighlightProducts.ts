import { APIUrlPath } from "@/src/core/lib/constants";
import axios from "axios";
export const fetchHighlightProducts = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}${APIUrlPath.GetProducts}`,
      {
        params: { is_priority: true, limit: 3, offset: 0 },
      }
    )
    .then((res) => res.data);
