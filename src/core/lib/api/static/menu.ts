import axios from "axios";
export const fetchMaahirMenu = async () => {
  const result = await axios
    // success case
    // .get("https://jsonplaceholder.typicode.com/todos/1")
    // error case
    // .get("https://jsonplaceholder.typicode.com/tods/1")
    // static public case
    .get(`${process.env.NEXT_PUBLIC_WEB_URL}/data/menu.json`)
    .then((res) => res.data);

  return result;
};
