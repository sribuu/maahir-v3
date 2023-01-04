export interface IResellerCart {
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
    selected: boolean;
    data: {
      category_id: number;
      category_name: string;
      description: string;
      detail_images: string[];
      product_id: number;
      product_name: string;
      image: string;
      profit_value: number;
      retail_price_max: number;
      retail_price_min: number;
      variant_name: string;
      variant_id: number;
      selected: boolean;
      price: number;
      quantity: number;
      stock: number;
      note: string;
    }[];
  };
}
