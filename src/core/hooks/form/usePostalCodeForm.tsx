import { useEffect, useState } from "react";
import { REGEX } from "../../lib/constants/regex";
import { numberFormatters } from "../../utils/formatters";

export interface IusePostalCodeFormProps {
  value?: string;
}

usePostalCodeForm.defaultProps = {
  value: "",
};

export default function usePostalCodeForm(defaultValue?: string) {
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue((state) => (state = defaultValue));
    }
  }, [defaultValue]);

  const onChange = (data: string) => {
    let newData = data;
    newData = numberFormatters.replaceCharWithEmptyString(data);
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
