import { PostCreateOrderRequestInterface } from "@/src/models/reseller/api/orders";
import axios from "axios";

const MockAdapter = require("axios-mock-adapter");

export const fetchPostCreateOrders = async (
  data: PostCreateOrderRequestInterface
) => {
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}/api/v1/maahir/orders/buy-group`;
  // if (process.env.NEXT_PUBLIC_MOCK_API === "true") {
  //   const mock = new MockAdapter(axios);
  //   mock
  //     .onPost(url, PostCheckProducts200Request)
  //     .reply(200, PostCheckProduct200Response);
  // }
  return await axios.post(url, data).then((res) => res.data);
};
