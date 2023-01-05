export type GetProductsRequestInterface = {
  limit: number;
  offset: number;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  title_like?: string | null;
  is_priority?: boolean;
};
