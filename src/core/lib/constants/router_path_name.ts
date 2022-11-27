export enum RouterPathName {
  Home = "/",
  AllProducts = "/products",
  ProductDetail = "/products/detail/[productId]",
  OrderProduct = "/orders/pesanan-kamu/[productId]",
  OrderSummary = "/orders/summary",
  // OrderFillDetail = "/orders/fill-detail-order",
  FillOrderDetail = "/orders/isi-detail-pesanan/[productId]",
  OrderCheckByCode = "/orders/check-order",
  OrderFinishPayment = "/orders/finish-payment",
  AllCartItems = "/cart",
}
