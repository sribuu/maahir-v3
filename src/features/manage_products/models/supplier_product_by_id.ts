export interface IGetSupplierProductByIdSuccessResponse {
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

export interface IGetSupplierProductByIdRequest {
  id: number;
}

export interface IGetSupplierProductByIdErrorResponse {
  error_code: string;
  message: string;
}
