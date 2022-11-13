import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ChoiceOfPaymentMethodCardComponent from "@/src/core/ui/components/choice_of_payment_method_card/ChoiceOfPaymentMethodCard.component";
import DeliveryAddressCardComponent from "@/src/core/ui/components/delivery_address_card/DeliveryAddressCard.component";
import YourOrderCardComponent from "@/src/core/ui/components/your_order_card/YourOrderCard.component";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import { IProducts } from "@/src/core/lib/models";
import { IPaymentMethodItems } from "@/src/core/lib/models/payment_method";
import {
  numberFormatters,
  thousandSeparator,
} from "@/src/core/utils/formatters";
import { REGEX } from "@/src/core/lib/constants/regex";

export interface IDetailOrderContainerProps {}

export default function DetailOrderContainer(
  props: IDetailOrderContainerProps
) {
  const router = useRouter();

  const quantity = parseInt(String(router.query?.productQuantity));
  const { data: productByIdData, isLoading: isLoadingProductByIdData } =
    useQuery<IProducts>({
      queryKey: ["maahir-product-by-id"],
      queryFn: () => fetchProductById(parseInt(String(router.query.id))),
    });
  const { data: paymentMethodData, isLoading: isLoadingPaymentMethodData } =
    useQuery<IPaymentMethodItems>({
      queryKey: ["maahir-payment-method"],
      queryFn: () => fetchPaymentMethod(),
    });

  const [state, setState] = useState({
    name: "",
    name_validation: false,
    email: "",
    email_validation: false,
    phone_number: "",
    phone_number_validation: false,
    address: "",
    address_validation: false,
    province: "",
    province_validation: false,
    district: "",
    district_validation: false,
    postal_code: "",
    postal_code_validation: false,
    payment_method: "",
    payment_method_validation: false,

    // button
    continue_payment: false,
  });

  const paymentItems = paymentMethodData.items.map((item) => {
    return {
      id: String(item.id),
      name: item.provider_name,
      logo: item.pic,
      selected: false,
    };
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => (state = { ...state, name: e.target.value }));
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => (state = { ...state, email: e.target.value }));
  };
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let PHONE_NUMBER = e.target.value;
    PHONE_NUMBER = numberFormatters.replaceCharWithEmptyString(e.target.value);
    setState((state) => (state = { ...state, phone_number: PHONE_NUMBER }));
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => (state = { ...state, address: e.target.value }));
  };
  const handleSelectProvince = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState((state) => (state = { ...state, province: e.currentTarget.id }));
  };
  const handleSelectDistrict = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState((state) => (state = { ...state, district: e.currentTarget.id }));
  };

  const handleChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let POSTAL_CODE = e.target.value;
    POSTAL_CODE = numberFormatters.replaceCharWithEmptyString(e.target.value);
    setState((state) => (state = { ...state, postal_code: POSTAL_CODE }));
  };
  const handleSelectPaymentMethod = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setState({ ...state, payment_method: String(e.currentTarget.id) });
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: `/product/[id]/quantity/[quantity]/order/summary`,
      query: {
        id: String(router.query.productId),
        quantity: String(router.query.productQuantity),
        name: state.name,
        email: state.email,
      },
    });
  };

  //   TODO: refactor to custom hooks
  //   name validation
  useEffect(() => {
    if (REGEX.NAME.test(state.name) && !REGEX.TRAILING_SLASH.test(state.name)) {
      setState({ ...state, name_validation: false });
    } else {
      setState({ ...state, name_validation: true });
    }
  }, [state.name]);

  //   email validation
  useEffect(() => {
    if (
      REGEX.EMAIL.test(state.email) &&
      !REGEX.TRAILING_SLASH.test(state.email)
    ) {
      setState({ ...state, email_validation: false });
    } else {
      setState({ ...state, email_validation: true });
    }
  }, [state.email]);

  //   phone number validation
  useEffect(() => {
    if (REGEX.INDONESIA_PHONE_NUMBER.test(state.phone_number)) {
      setState({ ...state, phone_number_validation: false });
    } else {
      setState({ ...state, phone_number_validation: true });
    }
  }, [state.phone_number]);

  //   address validation
  useEffect(() => {
    if (state.address.length > 0) {
      setState({ ...state, address_validation: false });
    } else {
      setState({ ...state, address_validation: true });
    }
  }, [state.address]);

  //   province validation
  useEffect(() => {
    if (state.province.length > 0) {
      setState({ ...state, province_validation: false });
    } else {
      setState({ ...state, province_validation: true });
    }
  }, [state.province]);

  //   district validation
  useEffect(() => {
    if (state.district.length > 0) {
      setState({ ...state, district_validation: false });
    } else {
      setState({ ...state, district_validation: true });
    }
  }, [state.district]);

  //   postal_code validation
  useEffect(() => {
    if (state.postal_code.length > 0) {
      setState({ ...state, postal_code_validation: false });
    } else {
      setState({ ...state, postal_code_validation: true });
    }
  }, [state.postal_code]);

  //   payment_method validation
  useEffect(() => {
    if (state.payment_method.length > 0) {
      setState({ ...state, payment_method_validation: false });
    } else {
      setState({ ...state, payment_method_validation: true });
    }
  }, [state.payment_method]);

  //    global validation
  useEffect(() => {
    if (state.name_validation && state.email_validation) {
      setState({ ...state, continue_payment: true });
    } else {
      setState({ ...state, continue_payment: false });
    }
  }, [state.name_validation, state.email_validation]);
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-[1.5rem] w-full pt-[8.875rem] pb-[10rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-start content-start justify-items-start items-start",
            "gap-y-[1.5rem] max-w-[75rem] w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1.75rem] font-bold",
              "text-charleston-green"
            )}
          >
            {"Isi Detail Pesanan"}
          </p>

          {/* delivery address and your order card  */}
          <div
            className={clsx(
              "grid grid-cols-[674px_478px] justify-start content-start justify-items-start items-start",
              "gap-x-[3rem] w-full"
            )}
          >
            <DeliveryAddressCardComponent
              name={state.name}
              email={state.email}
              phone_number={state.phone_number}
              address={state.address}
              province={state.province}
              district={state.district}
              postal_code={state.postal_code}
              onChangeName={handleChangeName}
              onChangeEmail={handleChangeEmail}
              onChangePhoneNumber={handleChangePhoneNumber}
              onChangeAddress={handleChangeAddress}
              onChangeProvince={handleSelectProvince}
              onChangeDistrict={handleSelectDistrict}
              onChangePostalCode={handleChangePostalCode}
            />
            <YourOrderCardComponent
              name={productByIdData.title}
              productSrc={productByIdData.image}
              minPrice={thousandSeparator(productByIdData.retail_price_min)}
              maxPrice={thousandSeparator(productByIdData.retail_price_max)}
              price={thousandSeparator(productByIdData.price)}
              quantity={quantity}
              disabled={!state.continue_payment}
              onSubmit={handleSubmit}
            />
          </div>
          {/* choice of payment  */}
          <div
            className={clsx(
              "grid grid-cols-[674px_478px] justify-start content-start justify-items-start items-start",
              "gap-x-[3rem] w-full"
            )}
          >
            <ChoiceOfPaymentMethodCardComponent
              paymentItems={paymentItems}
              selected={state.payment_method}
              onSelect={handleSelectPaymentMethod}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
