import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ChoiceOfPaymentMethodCardComponent from "@/src/core/ui/components/choice_of_payment_method_card/ChoiceOfPaymentMethodCard.component";
import DeliveryAddressFormCardComponent from "@/src/core/ui/components/delivery_address_form_card/DeliveryAddressFormCard.component";
import YourOrderCardComponent from "@/src/core/ui/components/your_order_card/YourOrderCard.component";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import { IDistrict, IProducts, IProvince } from "@/src/core/lib/models";
import { IPaymentMethodItems } from "@/src/core/lib/models/payment_method";
import {
  numberFormatters,
  thousandSeparator,
} from "@/src/core/utils/formatters";
import { REGEX } from "@/src/core/lib/constants/regex";
import useNameForm from "@/src/core/hooks/form/useNameForm";
import {
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import useEmailForm from "@/src/core/hooks/form/useEmailForm";
import usePhoneNumberForm from "@/src/core/hooks/form/usePhoneNumberForm";
import useAddressForm from "@/src/core/hooks/form/useAddressForm";
import useProvinceForm from "@/src/core/hooks/form/useProvinceForm";
import useDistrictForm from "@/src/core/hooks/form/useDistrictForm";
import usePostalCodeForm from "@/src/core/hooks/form/usePostalCodeForm";
import usePaymentMethodForm from "@/src/core/hooks/form/usePaymentMethodForm";
import { fetchMaahirDistrict, fetchMaahirProvince } from "@/src/core/lib/api";

export interface IDetailOrderContainerProps {}

export default function DetailOrderContainer(
  props: IDetailOrderContainerProps
) {
  const router = useRouter();
  const {
    value: name,
    validation: nameValidation,
    onChange: onChangeName,
  } = useNameForm();
  const {
    value: email,
    validation: emailValidation,
    onChange: onChangeEmail,
  } = useEmailForm();
  const {
    value: phoneNumber,
    validation: phoneNumberValidation,
    onChange: onChangePhoneNumber,
  } = usePhoneNumberForm();
  const {
    value: address,
    validation: addressValidation,
    onChange: onChangeAddress,
  } = useAddressForm();
  const {
    value: province,
    validation: provinceValidation,
    onChange: onChangeProvince,
  } = useProvinceForm();
  const {
    value: district,
    validation: districtValidation,
    onChange: onChangeDistrict,
  } = useDistrictForm();
  const {
    value: postalCode,
    validation: postalCodeValidation,
    onChange: onChangePostalCode,
  } = usePostalCodeForm();

  const {
    value: paymentMethod,
    validation: paymentMethodValidation,
    onChange: onChangePaymentMethod,
  } = usePaymentMethodForm();

  const quantity = parseInt(
    String(router.query[RouterQueryKey.ProductQuantity])
  );

  const { data: productByIdData, isLoading: isLoadingProductByIdData } =
    useQuery<IProducts>({
      queryKey: [ReactQueryKey.GetProductById],
      queryFn: () =>
        fetchProductById(
          parseInt(String(router.query[RouterQueryKey.ProductId]))
        ),
    });

  const { data: paymentMethodData, isLoading: isLoadingPaymentMethodData } =
    useQuery<IPaymentMethodItems>({
      queryKey: [ReactQueryKey.GetPaymentMethod],
      queryFn: () => fetchPaymentMethod(),
    });

  const { data: districtData, isLoading: isLoadingDistrictData } = useQuery<
    IDistrict[]
  >({
    queryKey: [ReactQueryKey.GetDistrict],
    queryFn: () => fetchMaahirDistrict(),
  });

  const { data: provinceData, isLoading: isLoadingProvinceData } = useQuery<
    IProvince[]
  >({
    queryKey: [ReactQueryKey.GetProvince],
    queryFn: () => fetchMaahirProvince(),
  });

  const [state, setState] = useState({
    continue_payment: false,
  });

  const paymentItems = paymentMethodData.items
    .filter((item) => item.status === "ACTIVE")
    .map((item) => {
      return {
        id: String(item.id),
        name: item.provider_name,
        logo: item.pic,
        selected: false,
      };
    });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeEmail(e.target.value);
  };
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhoneNumber(e.target.value);
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAddress(e.target.value);
  };
  const handleSelectProvince = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeProvince(e.currentTarget.id);
  };
  const handleSelectDistrict = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeDistrict(e.currentTarget.id);
  };

  const handleChangePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePostalCode(e.target.value);
  };
  const handleSelectPaymentMethod = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePaymentMethod(e.currentTarget.id);
  };

  //    global validation
  useEffect(() => {
    if (
      nameValidation &&
      emailValidation &&
      addressValidation &&
      phoneNumberValidation &&
      provinceValidation &&
      districtValidation &&
      postalCodeValidation &&
      paymentMethodValidation
    ) {
      setState({ ...state, continue_payment: true });
    } else {
      setState({ ...state, continue_payment: false });
    }
  }, [
    name,
    email,
    phoneNumber,
    address,
    province,
    district,
    postalCode,
    paymentMethodValidation,
  ]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push({
      pathname: RouterPathName.OrderSummary,
      query: {
        [RouterQueryKey.ProductId]: String(
          router.query[RouterQueryKey.ProductId]
        ),
        [RouterQueryKey.ProductQuantity]: String(
          router.query[RouterQueryKey.ProductQuantity]
        ),
        [RouterQueryKey.OrderName]: name,
        [RouterQueryKey.OrderEmail]: email,
        [RouterQueryKey.OrderAddress]: address,
        [RouterQueryKey.OrderPhoneNumber]: phoneNumber,
        [RouterQueryKey.OrderProvince]: province,
        [RouterQueryKey.OrderDistrict]: district,
        [RouterQueryKey.OrderPostalCode]: postalCode,
        [RouterQueryKey.PaymentMethodId]: paymentMethod,
      },
    });
  };
  if (isLoadingPaymentMethodData || isLoadingProductByIdData) {
    return <div />;
  }
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
            <DeliveryAddressFormCardComponent
              name={name}
              email={email}
              phone_number={phoneNumber}
              address={address}
              province={province}
              district={district}
              postal_code={postalCode}
              districtList={districtData.map((item) => item.name)}
              provinceList={provinceData.map((item) => item.name)}
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
              //   disabled={false}
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
              selected={paymentMethod}
              onSelect={handleSelectPaymentMethod}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
