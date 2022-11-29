export enum ReactQueryKey {
  // STATIC
  GetMenu = "maahir-menu",
  GetSocialMedia = "maahir-social-media",
  GetFAQ = "maahir-faq",
  GetHeaders = "maahir-headers",

  GetPriceCategory = "maahir-price-category",
  // TODO: remove this 3 items
  GetProductCategory = "maahir-product-category",
  GetProvince = "maahir-province",
  GetDistrict = "maahir-district",
  //   DYNAMIC
  GetTopThreeViralProducts = "maahir-top-three-viral-products",
  GetInfinityProductList = "maahir-infinity-list-products",
  GetProductById = "maahir-product-by-id",
  GetPaymentMethod = "maahir-payment-method",
  PostBuyProduct = "maahir-buy-product",
  GetOrderByOrderCode = "maahir-get-order",
  PostLogin = "maahir-login",
  GetRefreshToken = "maahir-get-refresh-token",
  GetSupplierStatistic = "maahir-get-supplier-statistic",
  GetBankList = "maahir-get-bank-list",
  GetProvinceList = "maahir-get-province-list",
  GetDistrictList = "maahir-get-district-list",
  PutUpdateSupplierProfile = "maahi-put-update-profile",
  GetSupplierProfile = "maahir-get-supplier-profile",
  GetSupplierProduct = "maahir-get-supplier-product",
  PostWithdrawBalance = "maahir-post-withdraw-balance",
  // STORAGE
  // cart
  GetCart = "maahir-cart",
  AddCart = "maahir-add-cart",
  DeleteAllCart = "maahir-delete-all-cart",
  // order
  SaveOrderItem = "maahir-save-order-item",
  GetOrderItem = "maahir-get-order-item",
  DeleteOrderItem = "maahir-delete-order-item",
  // credentials
  SaveSupplierCredentials = "maahir-save-supplier-credentials",
  GetSupplierCredentials = "maahir-get-supplier-credentials",
  RemoveSupplierCredentials = "maahir-remove-supplier-credentials",
}
