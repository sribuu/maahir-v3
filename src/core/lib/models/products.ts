export interface IProducts {
  title: string;
  profit_value: number;
  price: number;
  image: string;
  detail_images: string[];
  length: number;
  width: number;
  stock: number;
  height: number;
  weight: number;
  id: number;
  retail_price_min: number;
  retail_price_max: number;
  is_priority: boolean;
  description: string;
  category_name: string;
  category_id: number;
}
export interface IProductsRequest {
  limit?: number;
  offset?: number;
  category_id?: number;
  max_price?: number;
  min_price?: number;
  is_priority?: boolean;
}
