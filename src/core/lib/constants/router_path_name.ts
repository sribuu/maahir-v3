export enum RouterPathName {
  Home = "/",
  AllProducts = "/products",
  ProductDetail = "/products/detail/[productId]",
  OrderProduct = "/orders/pesanan-kamu/[productId]",
  Buy = "/buy",
  Shipment = "/shipment/single",

  FillOrderDetail = "/orders/isi-detail-pesanan/[productId]",
  OrderSummary = "/orders/ringkasan-pesanan/[productId]",
  OrderCheckByCode = "/orders/check-order",
  OrderFinishPayment = "/orders/finish-payment",
  AllCartItems = "/cart",

  // supplier
  Login = "/login",
  HomeSupplier = "/supplier/beranda",
  SupplierOrderManagement = "/supplier/kelola-pesanan",
  SupplierProductManagement = "/supplier/produk",
  SupplierAddProduct = "/supplier/produk/tambah",
  SupplierEditProduct = "/supplier/produk/edit/[productId]",
  SupplierBalanceManagement = "/supplier/kelola-saldo",
}
