export const orderStatusFormatters = {
  statusName(data: string) {
    const result =
      data === "INITIATED"
        ? "Menunggu Pembayaran"
        : data === "PAYMENT_COMPLETED"
        ? "Pembayaran Berhasil"
        : data === "PROCESSING"
        ? "Pesanan Diproses"
        : data === "ON_DELIVERY"
        ? "Pesanan Dikirim"
        : data === "ORDER_COMPLETED"
        ? "Pesanan Terkirim"
        : "";
    return result;
  },
  statusIcon(data: string) {
    const result =
      data === "INITIATED"
        ? "/icons/wait-for-payment.svg"
        : data === "PAYMENT_COMPLETED"
        ? "/icons/payment-received.svg"
        : data === "PROCESSING"
        ? "/icons/processed-order.svg"
        : data === "ON_DELIVERY"
        ? "/icons/order-is-sending.svg"
        : data === "ORDER_COMPLETED"
        ? "/icons/order-was-sent.svg"
        : "";
    return result;
  },
  statusColor(data: string) {
    const result =
      data === "INITIATED"
        ? "strawberry"
        : data === "PAYMENT_COMPLETED"
        ? "caribbean-green"
        : data === "PROCESSING"
        ? "caribbean-green"
        : data === "ON_DELIVERY"
        ? "caribbean-green"
        : data === "ORDER_COMPLETED"
        ? "caribbean-green"
        : "dark-charcoal";
    return result;
  },
};
