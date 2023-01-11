export type PostCheckProductsRequestInterface = {
  products: {
    id: number;
    variant_id: number;
    notes: string;
    quantity: number;
  }[];
};

export type PostCheckProductsResponseInterface = {
  products: {
    is_available: {
      stock: number;
      detail_images: string[];
      width: number;
      name: string;
      profit_value: number;
      retail_price_max: number;
      height: number;
      is_show: boolean;
      length: number;
      category_id: number;
      retail_price_min: number;
      category_name: string;
      weight: number;
      id: number;
      is_priority: null;
      // variants
      variant_stock: number;
      sku: string;
      variant_name: string;
      price: number;
      variant_id: number;
      variant_is_show: boolean;
      image: string;
      description: string;
      // additional
      notes: string;
      quantity: number;
    }[];
    is_not_available: {
      stock: number;
      detail_images: string[];
      width: number;
      name: string;
      profit_value: number;
      retail_price_max: number;
      height: number;
      is_show: boolean;
      length: number;
      category_id: number;
      retail_price_min: number;
      category_name: string;
      weight: number;
      id: number;
      is_priority: null;
      // variants
      variant_stock: number;
      sku: string;
      variant_name: string;
      price: number;
      variant_id: number;
      variant_is_show: boolean;
      image: string;
      description: string;
      // additional
      notes: string;
      quantity: number;
    }[];
  };
};
