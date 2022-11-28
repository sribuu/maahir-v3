import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import PaymentMethodSummary from "../../fragments/summary_payment_method/PaymentMethod.summary";
import { IProducts } from "@/src/core/lib/models";
import { IOrderRequest, IOrderResponse } from "../../models";
import { IPaymentMethodItems } from "@/src/core/lib/models/payment_method";
import {
  // fetchBuyProduct,
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import ChoiceOfPaymentMethodCardComponent from "@/src/core/ui/components/choice_of_payment_method_card/ChoiceOfPaymentMethodCard.component";
import DeliveryAddressFormCardComponent from "@/src/core/ui/components/delivery_address_form_card/DeliveryAddressFormCard.component";
import DeliveryAddressListCardComponent from "@/src/core/ui/components/delivery_address_list_card/DeliveryAddressListCard.component";
import SummaryYourOrderModalComponent from "@/src/core/ui/components/summary_your_order_modal/SummaryYourOrderModal.component";
import YourOrderCardSummary from "../../fragments/your_order_card/YourOrderCard.summary";
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
import useNameForm from "@/src/core/hooks/form/useNameForm";
import { thousandSeparator } from "@/src/core/utils/formatters";
export interface IPaymentSummaryOrderProps {}

export default function PaymentSummaryOrder(props: IPaymentSummaryOrderProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const productQuantity =
    router.query[RouterQueryKey.ProductQuantity] !== undefined &&
    router.query[RouterQueryKey.ProductQuantity].length > 0
      ? parseInt(String(router.query[RouterQueryKey.ProductQuantity]))
      : 0;

  const { data: productByIdData, isLoading: isLoadingProductByIdData } =
    useQuery<IProducts>({
      queryKey: [ReactQueryKey.GetProductById],
      queryFn: () =>
        fetchProductById({
          id: parseInt(String(router.query[RouterQueryKey.ProductId])),
        }),
    });
  const { data: paymentMethodData, isLoading: isLoadingPaymentMethodData } =
    useQuery<IPaymentMethodItems>({
      queryKey: [ReactQueryKey.GetPaymentMethod],
      queryFn: () => fetchPaymentMethod(),
    });
  const [paymentMethodState, setPaymentMethodState] = useState({
    change_detail_mode: false,
  });
  const [deliveryAddressState, setDeliveryAddressState] = useState({
    change_detail_mode: false,
  });
  const [yourOrderState, setYourOrderState] = useState({
    change_detail_mode: false,
    quantity: productQuantity,
    openModal: false,
    totalPrice: productByIdData.price * productQuantity,
  });
  const {
    value: name,
    validation: nameValidation,
    onChange: onChangeName,
  } = useNameForm(String(router.query[RouterQueryKey.OrderName]));
  const {
    value: email,
    validation: emailValidation,
    onChange: onChangeEmail,
  } = useEmailForm(String(router.query[RouterQueryKey.OrderEmail]));
  const {
    value: phoneNumber,
    validation: phoneNumberValidation,
    onChange: onChangePhoneNumber,
  } = usePhoneNumberForm(String(router.query[RouterQueryKey.OrderPhoneNumber]));
  const {
    value: address,
    validation: addressValidation,
    onChange: onChangeAddress,
  } = useAddressForm(String(router.query[RouterQueryKey.OrderAddress]));
  const {
    value: province,
    validation: provinceValidation,
    onChange: onChangeProvince,
  } = useProvinceForm(String(router.query[RouterQueryKey.OrderProvince]));
  const {
    value: district,
    validation: districtValidation,
    onChange: onChangeDistrict,
  } = useDistrictForm(String(router.query[RouterQueryKey.OrderDistrict]));
  const {
    value: postalCode,
    validation: postalCodeValidation,
    onChange: onChangePostalCode,
  } = usePostalCodeForm(String(router.query[RouterQueryKey.OrderPostalCode]));

  const {
    value: editPaymentMethodId,
    validation: editPaymentMethodIdValidation,
    onChange: onChangeEditPaymentMethodId,
  } = usePaymentMethodForm(
    String(router.query[RouterQueryKey.PaymentMethodId])
  );

  const {
    value: paymentMethodId,
    validation: paymentMethodIdValidation,
    onChange: onChangePaymentMethodId,
  } = usePaymentMethodForm(
    String(router.query[RouterQueryKey.PaymentMethodId])
  );

  const paymentMethodLogo = !paymentMethodData.items.filter(
    (item) => item.id === parseInt(paymentMethodId)
  ).length
    ? ""
    : paymentMethodData.items.filter(
        (item) => item.id === parseInt(paymentMethodId)
      )[0].pic;
  const paymentMethodName = !paymentMethodData.items.filter(
    (item) => item.id === parseInt(paymentMethodId)
  ).length
    ? ""
    : paymentMethodData.items.filter(
        (item) => item.id === parseInt(paymentMethodId)
      )[0].provider_name;
  const paymentMethodFee = !paymentMethodData.items.filter(
    (item) => item.id === parseInt(paymentMethodId)
  ).length
    ? 0
    : paymentMethodData.items.filter(
        (item) => item.id === parseInt(paymentMethodId)
      )[0].fee_amount;

  const handleClickEditPaymentMethod = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPaymentMethodState(
      (state) => (state = { ...state, change_detail_mode: true })
    );
  };

  const handleClickSavePaymentMethod = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePaymentMethodId(editPaymentMethodId);
    setPaymentMethodState(
      (state) => (state = { ...state, change_detail_mode: false })
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

  //   delivery address identity
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
    onChangeEditPaymentMethodId(e.currentTarget.id);
  };

  const handleEditDeliveryAddress = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDeliveryAddressState(
      (state) => (state = { ...state, change_detail_mode: true })
    );
  };

  //   your order
  const handleAddProduct = (data: number) => {
    setYourOrderState(
      (state) => (state = { ...state, quantity: state.quantity + 1 })
    );
  };
  const handleSubstractProduct = (data: number) => {
    setYourOrderState(
      (state) =>
        (state = {
          ...state,
          quantity: state.quantity > 0 ? state.quantity - 1 : state.quantity,
        })
    );
  };

  const handleClickYourSummaryProduct = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setYourOrderState((state) => (state = { ...state, openModal: true }));
  };
  const handleCloseModalYourSummaryProduct = () => {
    setYourOrderState((state) => (state = { ...state, openModal: false }));
  };
  const handleSaveEditYourSummaryProduct = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setYourOrderState(
      (state) =>
        (state = {
          ...state,
          openModal: false,
          totalPrice: state.quantity * productByIdData.price,
        })
    );
  };

  const handleSaveEditDeliveryAddress = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDeliveryAddressState(
      (state) =>
        (state = {
          ...state,
          change_detail_mode: false,
        })
    );
  };

  // const {
  //   data: buyProductData,
  //   isSuccess: isSuccessBuyProduct,
  //   isError: isErrorBuyProduct,
  //   isLoading: isLoadingBuyProduct,
  //   mutate: buyProduct,
  // } = useMutation<IOrderResponse | undefined, unknown, IOrderRequest, unknown>({
  //   mutationFn: (data: IOrderRequest) => {
  //     return fetchBuyProduct(data);
  //   },
  //   onSuccess: (data) => {
  //     queryClient.setQueryData([ReactQueryKey.PostBuyProduct], data);
  //   },
  // });

  const handleClickBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    // buyProduct({
    //   name: name,
    //   email: email,
    //   phone_number: phoneNumber,
    //   // product_id: parseInt(String(router.query[RouterQueryKey.ProductId])),
    //   // quantity: productQuantity,
    //   kecamatan: district,
    //   address: address,
    //   province: province,
    //   postal_code: postalCode,
    //   payment_method_id: parseInt(paymentMethodId),
    // });
  };

  // useEffect(() => {
  //   if (isSuccessBuyProduct) {
  //     router.push({
  //       pathname: RouterPathName.OrderFinishPayment,
  //       query: {
  //         [RouterQueryKey.OrderCode]: buyProductData.order_code,
  //       },
  //     });
  //   }
  // }, [isSuccessBuyProduct]);
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
                  save={true}
                  paymentItems={paymentItems}
                  selected={String(editPaymentMethodId)}
                  onSelect={handleSelectPaymentMethod}
                  onSave={handleClickSavePaymentMethod}
                />
              )}

              {/* delivery address */}
              {!deliveryAddressState.change_detail_mode && (
                <DeliveryAddressListCardComponent
                  name={name}
                  email={email}
                  phone_number={phoneNumber}
                  address={address}
                  province={province}
                  district={district}
                  postal_code={postalCode}
                  onEdit={handleEditDeliveryAddress}
                />
              )}

              {deliveryAddressState.change_detail_mode && (
                <DeliveryAddressFormCardComponent
                  name={name}
                  email={email}
                  phone_number={phoneNumber}
                  address={address}
                  province={province}
                  district={district}
                  postal_code={postalCode}
                  save={true}
                  onChangeName={handleChangeName}
                  onChangeEmail={handleChangeEmail}
                  onChangePhoneNumber={handleChangePhoneNumber}
                  onChangeAddress={handleChangeAddress}
                  onChangeProvince={handleSelectProvince}
                  onChangeDistrict={handleSelectDistrict}
                  onChangePostalCode={handleChangePostalCode}
                  onSave={handleSaveEditDeliveryAddress}
                />
              )}
            </div>

            {/* right */}
            <div>
              <YourOrderCardSummary
                disabled={false}
                productSrc={productByIdData.image}
                name={productByIdData.title}
                price={thousandSeparator(productByIdData.price)}
                quantity={yourOrderState.quantity}
                totalPrice={thousandSeparator(yourOrderState.totalPrice)}
                deliveryPrice={thousandSeparator(paymentMethodFee)}
                onEdit={handleClickYourSummaryProduct}
                onSubmit={handleClickBuy}
              />
              {yourOrderState.openModal && (
                <SummaryYourOrderModalComponent
                  open={yourOrderState.openModal}
                  productSrc={productByIdData.image}
                  name={productByIdData.title}
                  price={thousandSeparator(productByIdData.price)}
                  maxPrice={thousandSeparator(productByIdData.retail_price_max)}
                  minPrice={thousandSeparator(productByIdData.retail_price_min)}
                  quantity={yourOrderState.quantity}
                  onSubstract={handleSubstractProduct}
                  onAdd={handleAddProduct}
                  onClose={handleCloseModalYourSummaryProduct}
                  onSave={handleSaveEditYourSummaryProduct}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
