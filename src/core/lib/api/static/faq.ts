import axios from "axios";
export const fetchMaahirFAQ = async () => {
  const result = await axios
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}/data/faq.json`)
    .then((res) => res.data);

  return result;
};
