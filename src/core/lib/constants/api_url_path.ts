export enum APIUrlPath {
  // STATIC
  GetFAQ = "/data/faq.json",
  GetMenu = "/data/menu.json",
  GetSocialMedia = "/data/social-media.json",
  GetHeaders = "/data/headers.json",
  GetProductCategory = "/data/product-category.json",
  GetPriceCategory = "/data/price-category.json",
  GetProvince = "/data/province.json",
  // DYNAMIC
  GetProducts = "/api/v1/maahir/products",
  GetProductById = "/api/v1/maahir/products/view",
  GetPaymentMethod = "/api/v1/payments/methods",
  PostBuyProduct = "/api/v1/maahir/orders/buy",
  GetOrder = "/api/v1/maahir/orders/view",
  GetOptions = "/api/v1/maahir/options",
  PostLogin = "/api/v1/maahir/supplier/login",
  RefreshToken = "/v2/session",
  // supplier
  GetSupplierStatistic = "/api/v1/maahir/supplier/balances/statistic",
  PostUpdateSupplierProfile = "/api/v1/maahir/supplier/profile",
  PutUpdateSupplierProfile = "/api/v1/maahir/supplier/profile",
  GetSupplierProfile = "/api/v1/maahir/supplier/profile",
  SupplierProduct = "/api/v1/maahir/supplier/products",
  SupplierProductById = "/api/v1/maahir/supplier/products/view",
  UploadSupplierProductImages = "/api/v1/maahir/supplier/products/insert-image",
  PostChangeSupplierProductShow = "/api/v1/maahir/supplier/products/change-show",
  PostWithdrawBalance = "/api/v1/maahir/supplier/balances/withdrawal",
}
