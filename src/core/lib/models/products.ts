export interface IProducts {
  title: string;
  profit_value: number;
  price: number;
  image: string;
  id: number;
  retail_price_min: number;
  retail_price_max: number;
  is_priority: boolean;
  description: string;
}
export interface IProductsRequest {
  limit?: number;
  offset?: number;
  category_id?: number;
  max_price?: number;
  min_price?: number;
  is_priority?: boolean;
}
