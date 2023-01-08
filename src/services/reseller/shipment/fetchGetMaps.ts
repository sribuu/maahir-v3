import axios from "axios";

import { PostMapsRequestInterface } from "@/src/models/reseller/api/shipment";

export const fetchGetMaps = async (data: PostMapsRequestInterface) =>
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}/api/v1/maahir/shipping/maps`,
      data
    )
    .then((res) => res.data);
