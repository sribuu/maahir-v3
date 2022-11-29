export interface IGetSupplierProductSuccessResponse {
  title: string;
  id: number;
  is_priority: null | boolean;
  is_show: boolean;
  profit_value: number;
  image: string;
  price: number;
  retail_price_min: number;
  detail_images: string[];
  retail_price_max: number;
  category_name: string;
  category_id: number;
  description: string;
  stock: number;
}

export interface IGetSupplierProductRequest {
  limit: number;
  offset: number;
  is_show: boolean;
  title_like?: string;
}

export interface IGetSupplierProductErrorResponse {
  error_code: string;
  message: string;
}

export interface ISupplierProductItem {
  image: string;
  id: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  action: string;
}
