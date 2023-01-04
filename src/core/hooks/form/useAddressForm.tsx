import { useEffect, useState } from "react";
import { REGEX } from "../../lib/constants/regex";

export interface IuseAddressFormProps {
  value?: string;
}

useAddressForm.defaultProps = {
  value: "",
};

export default function useAddressForm(defaultValue?: string) {
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue((state) => (state = defaultValue));
    }
  }, [defaultValue]);

  const onChange = (data: string) => {
    const newData = data;
    setValue((state) => (state = newData));
  };

  //   validation criteria
  useEffect(() => {
    setValidation((state) => (state = value.length > 0));
  }, [value]);
  return {
    value,
    validation,
    onChange,
  };
}
