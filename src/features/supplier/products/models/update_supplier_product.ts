export interface IUpdateSupplierProductSuccessResponse {
  retail_price_max: number;
  description: string;
  is_priority: null | boolean;
  profit_value: number;
  image: string;
  price: number;
  title: string;
  id: number;
  category_name: string;
  stock: number;
  retail_price_min: number;
  detail_images: string[];
  category_id: number;
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface IUpdateSupplierProductRequest {
  title: string;
  description: string;
  price?: number;
  retail_price_min?: number;
  retail_price_max?: number;
  profit_value?: number;
  category_id: number;
  is_show: boolean;
  stock?: number;
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface IUpdateSupplierProductErrorResponse {
  error_code: string;
  message: string;
}
