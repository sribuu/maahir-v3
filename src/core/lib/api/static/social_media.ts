import axios from "axios";
import { APIUrlPath } from "../../constants";
export const fetchMaahirSocialMedia = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}${APIUrlPath.GetSocialMedia}`)
    .then((res) => res.data);

  return result;
};
