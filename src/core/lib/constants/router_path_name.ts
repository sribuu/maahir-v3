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

  // supplier
  Login = "/login",
  HomeSupplier = "/supplier/beranda",
  SupplierOrderManagement = "/supplier/kelola-pesanan",
  SupplierProductManagement = "/supplier/produk",
  SupplierAddProduct = "/supplier/produk/tambah",
  SupplierEditProduct = "/supplier/produk/edit",
  SupplierBalanceManagement = "/supplier/kelola-saldo",
}
