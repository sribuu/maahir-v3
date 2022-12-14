export interface ISupplierProducts {
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
  title: string;
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
}
