import React, { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import useOrderIdForm from "@/src/core/hooks/form/useOrderIdForm";
import HeroSearchOrder from "../../fragments/hero_search/HeroSearch.order";
export interface ISearchOrderContainerProps {}

interface IFormInput {
  orderId: string;
}
export default function SearchOrderContainer(
  props: ISearchOrderContainerProps
) {
  const { value: orderId, onChange: onChangeOrderId } = useOrderIdForm({
    value: "",
  });
  //   const [orderId, setOrderId] = useState("");

  const handleChangeOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeOrderId(e.target.value);
  };
  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    //
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
            {"Cek Order Kamu"}
          </p>
          {/* search textfield */}
          <TextfieldComponent
            value={orderId}
            placeholder={"Masukkan ID ordermu... "}
            onChange={handleChangeOrderId}
            endAddornment={
              <button
                className={clsx(
                  "grid place-content-center place-items-center",
                  "w-[2rem] h-[2rem] rounded-[0.375rem]",
                  "bg-ocean-boat-blue"
                )}
                onClick={handleClickSearch}
              >
                <img src={"/icons/search.svg"} />
              </button>
            }
          />

          <HeroSearchOrder />
        </div>
      </div>
    </MainLayout>
  );
}
