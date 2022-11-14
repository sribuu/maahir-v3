import { useEffect, useState } from "react";
import { REGEX } from "../../lib/constants/regex";
import { numberFormatters } from "../../utils/formatters";

export interface IusePhoneNumberFormProps {
  value?: string;
}

usePhoneNumberForm.defaultProps = {
  value: "",
};

export default function usePhoneNumberForm(defaultValue?: string) {
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
    setValidation(
      (state) => (state = REGEX.INDONESIA_PHONE_NUMBER.test(value))
    );
  }, [value]);
  return {
    value,
    validation,
    onChange,
  };
}
