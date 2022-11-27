export enum ReactQueryKey {
  // STATIC
  GetMenu = "maahir-menu",
  GetSocialMedia = "maahir-social-media",
  GetFAQ = "maahir-faq",
  GetHeaders = "maahir-headers",
  GetProductCategory = "maahir-product-category",
  GetPriceCategory = "maahir-price-category",
  GetProvince = "maahir-province",
  GetDistrict = "maahir-district",
  //   DYNAMIC
  GetTopThreeViralProducts = "maahir-top-three-viral-products",
  GetInfinityProductList = "maahir-infinity-list-products",
  GetProductById = "maahir-product-by-id",
  GetPaymentMethod = "maahir-payment-method",
  PostBuyProduct = "maahir-buy-product",
  GetOrderByOrderCode = "maahir-get-order",
  // STORAGE
  // cart
  GetCart = "maahir-cart",
  AddCart = "maahir-add-cart",
  DeleteAllCart = "maahir-delete-all-cart",
  // order
  SaveOrderItem = "maahir-save-order-item",
  GetOrderItem = "maahir-get-order-item",
  DeleteOrderItem = "maahir-delete-order-item",
}
