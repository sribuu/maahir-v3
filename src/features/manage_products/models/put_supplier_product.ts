export interface IPutSupplierProductSuccessResponse {
  description: string;
  is_priority: null | boolean;
  image: string;
  price: number;
  title: string;
  id: number;
  category_name: string;
  stock: number;

  detail_images: string[];
  category_id: number;
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface IPutSupplierProductRequest {
  id: number;
  title: string;
  description?: string;
  category_id: number;
  is_show: boolean;
  weight: number;
  length: number;
  width: number;
  height: number;
  variants: {
    sku: string;
    name: string;
    stock: number;
    price: number;
    is_show: boolean;
  }[];
}

export interface IPutSupplierProductErrorResponse {
  error_code: string;
  message: string;
}
