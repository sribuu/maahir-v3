export interface IProducts {
  category_id: number;
  category_name: string;
  description: string;
  detail_images: string[];
  height: number;
  id: number;
  id_variant: number;
  image: string;
  is_priority: boolean;
  is_show: boolean;
  length: number;
  price: number;
  profit_value: number;
  retail_price_max: number;
  retail_price_min: number;
  stock: number;
  name: string;
  sku: string;
  variant_name: string;
  weight: number;
  width: number;
  variants: {
    sku: string;
    id: number;
    name: string;
    product_id: number;
    stock: number;
    price: number;
    is_show: boolean;
  }[];
  supplier: {
    id: number;
    name: string;
    name_initial: string;
    address: {
      id: string;
      name: string;
      country_name: string;
      country_code: string;
      administrative_division_level_1_name: string;
      administrative_division_level_1_type: string;
      administrative_division_level_2_name: string;
      administrative_division_level_2_type: string;
      administrative_division_level_3_name: string;
      administrative_division_level_3_type: string;
      postal_code: string;
    };
  };
}
export interface IProductsRequest {
  limit?: number;
  offset?: number;
  category_id?: number;
  max_price?: number;
  min_price?: number;
  is_priority?: boolean;
}
