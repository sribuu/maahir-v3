import {
  PostCheckProduct200Response,
  PostCheckProducts200Request,
} from "@/src/data/reseller/api/products";
import { PostCheckProductsRequestInterface } from "@/src/models/reseller/api/products";
import axios from "axios";

const MockAdapter = require("axios-mock-adapter");

export const fetchPostCheckProducts = async (
  data: PostCheckProductsRequestInterface
) => {
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}${process.env.NEXT_PUBLIC_REMOTE_API}/api/v1/maahir/products/check`;
  if (process.env.NEXT_PUBLIC_MOCK_API === "true") {
    const mock = new MockAdapter(axios);
    mock
      .onPost(url, PostCheckProducts200Request)
      .reply(200, PostCheckProduct200Response);
  }
  return await axios
    .post(url, PostCheckProducts200Request)
    .then((res) => res.data);
};
