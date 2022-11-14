import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import PaymentMethodSummary from "../../fragments/summary_payment_method/PaymentMethod.summary";
import { IProducts } from "@/src/core/lib/models";
import { IPaymentMethodItems } from "@/src/core/lib/models/payment_method";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import ChoiceOfPaymentMethodCardComponent from "@/src/core/ui/components/choice_of_payment_method_card/ChoiceOfPaymentMethodCard.component";
import DeliveryAddressFormCardComponent from "@/src/core/ui/components/delivery_address_form_card/DeliveryAddressFormCard.component";
import DeliveryAddressListCardComponent from "@/src/core/ui/components/delivery_address_list_card/DeliveryAddressListCard.component";
import { numberFormatters } from "@/src/core/utils/formatters";
export interface IPaymentSummaryOrderProps {}

export default function PaymentSummaryOrder(props: IPaymentSummaryOrderProps) {
  const router = useRouter();
  const [paymentMethodState, setPaymentMethodState] = useState({
    change_detail_mode: false,
    payment_method: "",
  });
  const [deliveryAddressState, setDeliveryAddressState] = useState({
    change_detail_mode: false,
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
  });
  const { data: productByIdData, isLoading: isLoadingProductByIdData } =
    useQuery<IProducts>({
      queryKey: ["maahir-product-by-id"],
      queryFn: () =>
        fetchProductById(parseInt(String(router.query["productId"]))),
    });
  const { data: paymentMethodData, isLoading: isLoadingPaymentMethodData } =
    useQuery<IPaymentMethodItems>({
      queryKey: ["maahir-payment-method"],
      queryFn: () => fetchPaymentMethod(),
    });

  const paymentMethodId =
    router.query.paymentMethodId !== undefined &&
    router.query.paymentMethodId.length > 0
      ? parseInt(String(router.query["paymentMethodId"]))
      : -1;

  const paymentMethodLogo = !paymentMethodData.items.filter(
    (item) => item.id === paymentMethodId
  ).length
    ? ""
    : paymentMethodData.items.filter((item) => item.id === paymentMethodId)[0]
        .pic;
  const paymentMethodName = !paymentMethodData.items.filter(
    (item) => item.id === paymentMethodId
  ).length
    ? ""
    : paymentMethodData.items.filter((item) => item.id === paymentMethodId)[0]
        .provider_name;

  const handleClickEditPaymentMethod = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPaymentMethodState(
      (state) => (state = { ...state, change_detail_mode: true })
    );
  };
  const paymentItems = paymentMethodData.items.map((item) => {
    return {
      id: String(item.id),
      name: item.provider_name,
      logo: item.pic,
      selected: false,
    };
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, name: e.target.value })
    );
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, email: e.target.value })
    );
  };
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let PHONE_NUMBER = e.target.value;
    PHONE_NUMBER = numberFormatters.replaceCharWithEmptyString(e.target.value);
    setDeliveryAddressState(
      (state) => (state = { ...state, phone_number: PHONE_NUMBER })
    );
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, address: e.target.value })
    );
  };
  const handleSelectProvince = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, province: e.currentTarget.id })
    );
  };
  const handleSelectDistrict = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, district: e.currentTarget.id })
    );
  };

  const handleChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let POSTAL_CODE = e.target.value;
    POSTAL_CODE = numberFormatters.replaceCharWithEmptyString(e.target.value);
    setDeliveryAddressState(
      (state) => (state = { ...state, postal_code: POSTAL_CODE })
    );
  };
  const handleSelectPaymentMethod = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDeliveryAddressState(
      (state) =>
        (state = { ...state, payment_method: String(e.currentTarget.id) })
    );
  };

  //   TODO: refactor to custom hooks
  //   name validation
  //   useEffect(() => {
  //     if (REGEX.NAME.test(state.name) && !REGEX.TRAILING_SLASH.test(state.name)) {
  //       setDeliveryAddressState({ ...state, name_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, name_validation: true });
  //     }
  //   }, [state.name]);

  //   //   email validation
  //   useEffect(() => {
  //     if (
  //       REGEX.EMAIL.test(state.email) &&
  //       !REGEX.TRAILING_SLASH.test(state.email)
  //     ) {
  //       setDeliveryAddressState({ ...state, email_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, email_validation: true });
  //     }
  //   }, [state.email]);

  //   //   phone number validation
  //   useEffect(() => {
  //     if (REGEX.INDONESIA_PHONE_NUMBER.test(state.phone_number)) {
  //       setDeliveryAddressState({ ...state, phone_number_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, phone_number_validation: true });
  //     }
  //   }, [state.phone_number]);

  //   //   address validation
  //   useEffect(() => {
  //     if (state.address.length > 0) {
  //       setDeliveryAddressState({ ...state, address_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, address_validation: true });
  //     }
  //   }, [state.address]);

  //   //   province validation
  //   useEffect(() => {
  //     if (state.province.length > 0) {
  //       setDeliveryAddressState({ ...state, province_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, province_validation: true });
  //     }
  //   }, [state.province]);

  //   //   district validation
  //   useEffect(() => {
  //     if (state.district.length > 0) {
  //       setDeliveryAddressState({ ...state, district_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, district_validation: true });
  //     }
  //   }, [state.district]);

  //   //   postal_code validation
  //   useEffect(() => {
  //     if (state.postal_code.length > 0) {
  //       setDeliveryAddressState({ ...state, postal_code_validation: false });
  //     } else {
  //       setDeliveryAddressState({ ...state, postal_code_validation: true });
  //     }
  //   }, [state.postal_code]);

  const handleEditDeliveryAddress = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, change_detail_mode: true })
    );
  };

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
          <div
            className={clsx(
              "grid grid-cols-[740px_412px] justify-start content-start justify-items-start items-start",
              "gap-x-[3rem] w-full"
            )}
          >
            {/* left */}
            <div
              className={clsx(
                "grid grid-cols-1 justify-start content-start justify-items-start items-start",
                "gap-y-[2.25rem] w-full"
              )}
            >
              {!paymentMethodState.change_detail_mode && (
                <PaymentMethodSummary
                  name={paymentMethodName}
                  logo={paymentMethodLogo}
                  onEdit={handleClickEditPaymentMethod}
                />
              )}

              {paymentMethodState.change_detail_mode && (
                <ChoiceOfPaymentMethodCardComponent
                  paymentItems={paymentItems}
                  selected={String(paymentMethodId)}
                  onSelect={handleSelectPaymentMethod}
                />
              )}

              {/* delivery address */}
              {!deliveryAddressState.change_detail_mode && (
                <DeliveryAddressListCardComponent
                  name={deliveryAddressState.name}
                  email={deliveryAddressState.email}
                  phone_number={deliveryAddressState.phone_number}
                  address={deliveryAddressState.address}
                  province={deliveryAddressState.province}
                  district={deliveryAddressState.district}
                  postal_code={deliveryAddressState.postal_code}
                  onEdit={handleEditDeliveryAddress}
                />
              )}

              {deliveryAddressState.change_detail_mode && (
                <DeliveryAddressFormCardComponent
                  name={deliveryAddressState.name}
                  email={deliveryAddressState.email}
                  phone_number={deliveryAddressState.phone_number}
                  address={deliveryAddressState.address}
                  province={deliveryAddressState.province}
                  district={deliveryAddressState.district}
                  postal_code={deliveryAddressState.postal_code}
                  onChangeName={handleChangeName}
                  onChangeEmail={handleChangeEmail}
                  onChangePhoneNumber={handleChangePhoneNumber}
                  onChangeAddress={handleChangeAddress}
                  onChangeProvince={handleSelectProvince}
                  onChangeDistrict={handleSelectDistrict}
                  onChangePostalCode={handleChangePostalCode}
                />
              )}
            </div>

            {/* right */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
