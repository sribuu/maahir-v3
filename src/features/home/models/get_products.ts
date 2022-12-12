export type IResellerHomeGetProductsItemRequest = {};

export type IResellerHomeGetProductsItemResponse = {
  total: number;
  products: {
    category_id: number;
    category_name: string;
    description: string;
    detail_images: string[];
    height: number;
    id: number;
    image: string;
    is_priority: boolean;
    is_show: boolean;
    length: number;
    price: number;
    profit_value: number;
    retail_price_max: number;
    retail_price_min: number;
    stock: number;
    title: string;
    variants: {
      sku: string;
      id: number;
      name: string;
      product_id: number;
      stock: number;
      price: number;
      is_show: boolean;
    }[];
  }[];
};
