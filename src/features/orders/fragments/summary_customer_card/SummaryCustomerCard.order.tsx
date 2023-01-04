import { useState } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import PersonalInformationForm from "../personal_information_form/PersonalInformationForm.order";
import DeliveryAddressListCardComponent from "@/src/features/orders/fragments/delivery_address_list_card/DeliveryAddressListCard.component";
import { useOrderItemQuery } from "../../hooks/useOrderItem";
export interface ISummaryCustomerOrderCardProps {
  title?: string;
}

SummaryCustomerOrderCard.defaultProps = {
  title: "Alamat Pengantaran",
};

export default function SummaryCustomerOrderCard(
  props: ISummaryCustomerOrderCardProps
) {
  const { data: orderItem, isLoading } = useOrderItemQuery();
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };
  return (
    <CardComponent className={clsx("p-[1.5rem]", "gap-y-[1.5rem]")}>
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <h1 className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
          {props.title}
        </h1>
        {edit ? (
          <button onClick={handleSave}>
            <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
              {"SIMPAN"}
            </p>
          </button>
        ) : (
          <button onClick={handleEdit}>
            <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
              {"UBAH DETAIL"}
            </p>
          </button>
        )}
      </div>

      {edit ? (
        <PersonalInformationForm
          name={orderItem?.name}
          email={orderItem?.email}
          phonenumber={orderItem?.phone_number}
          address={orderItem?.address}
          // onChangeName={setName}
          // onErrorName={setErrorName}
          // onChangeEmail={setEmail}
          // onErrorEmail={setErrorEmail}
          // onChangeAddress={setAddress}
          // onErrorAddress={setErrorAddress}
          // onChangePhonenumber={setPhonenumber}
          // onErrorPhonenumber={setErrorPhonenumber}
        />
      ) : (
        <DeliveryAddressListCardComponent
          name={orderItem?.name}
          email={orderItem?.email}
          phone_number={orderItem?.phone_number}
          address={orderItem?.address}
        />
      )}
    </CardComponent>
  );
}
