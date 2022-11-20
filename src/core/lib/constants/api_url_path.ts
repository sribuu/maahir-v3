export enum APIUrlPath {
  // STATIC
  GetFAQ = "/data/faq.json",
  GetMenu = "/data/menu.json",
  GetSocialMedia = "/data/social-media.json",
  GetHeaders = "/data/headers.json",
  GetProductCategory = "/data/product-category.json",
  GetPriceCategory = "/data/price-category.json",
  GetProvince = "/data/province.json",
  GetDistrict = "/data/district.json",
  // DYNAMIC
  GetProducts = "/api/v1/maahir/products",
  GetProductById = "/api/v1/maahir/products/view",
  GetPaymentMethod = "/api/v1/payments/methods",
  PostBuyProduct = "/api/v1/maahir/orders/buy",
  GetOrder = "/api/v1/maahir/orders/view",
}
