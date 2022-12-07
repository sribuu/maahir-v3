export type IProductGetProductsItemRequest = {
  limit: number;
  offset: number;
  category_id?: number;
  min_price?: number;
  max_price?: number;
};
