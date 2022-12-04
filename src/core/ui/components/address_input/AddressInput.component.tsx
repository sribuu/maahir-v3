import React, { useState, useEffect } from "react";
import TextfieldComponent from "../textfield/Textfield.component";

export interface IAddressInputComponentProps {
  onChange?: (data: string) => void;
}

export default function AddressInputComponent(
  props: IAddressInputComponentProps
) {
  const [address, setAddress] = useState("");
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(address);
    }
  }, [address]);

  return (
    <TextfieldComponent
      value={address}
      label={"Alamat"}
      placeholder={"jl. rawah bebek"}
      onChange={handleChangeAddress}
    />
  );
}
