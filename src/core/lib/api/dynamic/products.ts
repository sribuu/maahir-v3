import axios from "axios";
export const fetchHighlightProducts = async () =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products`, {
      headers: { Authorization: "8QhbYqB9X2w9px9c" },
      params: { is_priority: true },
    })
    .then((res) => res.data);
