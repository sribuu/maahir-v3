import axios from "axios";
export const fetchPaymentMethod = async () =>
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_AWS_LAMBDA_API_URL}/staging/api/v1/payments/methods`
    )
    .then((res) => res.data);
