import axios from "axios";
export const fetchMaahirSocialMedia = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}/data/social-media.json`)
    .then((res) => res.data);

  return result;
};
