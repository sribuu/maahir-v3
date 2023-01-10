import {
  PostCheckProductsRequestInterface,
  PostCheckProductsResponseInterface,
} from "@/src/models/reseller/api/products";

export const PostCheckProducts200Request: PostCheckProductsRequestInterface = {
  product: [
    { id: 30, variant_id: 45, notes: "", quantity: 1 },
    { id: 26, variant_id: 36, notes: "", quantity: 1 },
  ],
};

export const PostCheckProduct200Response: PostCheckProductsResponseInterface = {
  products: {
    is_available: [
      {
        category_name: "Fashion",
        name: "Kaos Polos",
        variant_name: "Putih",
        price: 30000.0,
        image:
          "https://lzd-img-global.slatic.net/g/p/040ef8a16f39d3e3b098f8872a50f4af.jpg_720x720q80.jpg_.webp",

        notes: "",
        quantity: 1,
        // additional
        stock: 2022,
        detail_images: [
          "https://lzd-img-global.slatic.net/g/p/040ef8a16f39d3e3b098f8872a50f4af.jpg_720x720q80.jpg_.webp",
        ],
        width: 10,
        profit_value: 0.0,
        retail_price_max: 0.0,
        height: 20,
        is_show: true,
        length: 100,
        category_id: 76,
        retail_price_min: 0.0,
        weight: 90,
        id: 30,
        is_priority: null,
        // variants
        variant_stock: 2022,
        sku: "masdasw",
        variant_id: 45,
        variant_is_show: true,
        description: "description data",
      },
    ],
    is_not_available: [
      {
        category_name: "Fashion",
        name: "Kaos Polos",
        variant_name: "Hitam",
        price: 20000.0,
        image:
          "https://lzd-img-global.slatic.net/g/p/b41d8df69c202b44970baae372113916.jpg_720x720q80.jpg_.webp",

        notes: "",
        quantity: 1,
        // additional
        stock: 0,
        detail_images: [
          "https://lzd-img-global.slatic.net/g/p/b41d8df69c202b44970baae372113916.jpg_720x720q80.jpg_.webp",
          "https://lzd-img-global.slatic.net/g/p/b41d8df69c202b44970baae372113916.jpg_720x720q80.jpg_.webp",
        ],
        width: 10,
        profit_value: 0.0,
        retail_price_max: 0.0,
        height: 20,
        is_show: true,
        length: 100,
        category_id: 76,
        retail_price_min: 0.0,
        weight: 90,
        id: 30,
        is_priority: null,
        // variants
        variant_stock: 0,
        sku: "masdasw",
        variant_id: 45,
        variant_is_show: true,
        description: "description data",
      },
    ],
  },
};
