export interface ICreateSupplierProductSuccessResponse {
  //   retail_price_max: 20000;
  //   description: "Serj Tankian";
  //   is_priority: null;
  //   profit_value: 3000;
  //   image: "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/None";
  //   price: 100000;
  //   title: "Bluray System Of A Down";
  //   id: 23;
  //   category_name: "Pakaian";
  //   stock: 100;
  //   retail_price_min: 1000;
  //   detail_images: [];
  //   category_id: 77;
  //   weight: 90;
  //   length: 100;
  //   width: 10;
  //   height: 20;
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

export interface ICreateSupplierProductRequest {
  //   title: "test baru 24";
  //   description: "description data";
  //   price: 100000;
  //   retail_price_min: 1000;
  //   retail_price_max: 20000;
  //   profit_value: 3000;
  //   category_id: 76;
  //   is_show: true;
  //   stock: 100;
  //   weight: 90;
  //   length: 100;
  //   width: 10;
  //   height: 20;
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

export interface ICreateSupplierProductErrorResponse {
  error_code: string;
  message: string;
}
