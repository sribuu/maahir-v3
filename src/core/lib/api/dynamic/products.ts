import axios from "axios";
export const fetchTopThreeViralProducts = async () =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products`, {
      headers: { Authorization: "8QhbYqB9X2w9px9c" },
      params: { is_priority: true, limit: 3, offset: 0 },
    })
    .then((res) => res.data);

export const fetchInfinityListProducts = async (pageParam: number) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/maahir/products`, {
      headers: { Authorization: "8QhbYqB9X2w9px9c" },
      params: { limit: 16, offset: (pageParam - 1) * 16 },
    })
    .then((res) => res.data);
