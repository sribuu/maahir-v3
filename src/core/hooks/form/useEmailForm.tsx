import { useEffect, useState } from "react";
import { REGEX } from "../../lib/constants/regex";

export interface IuseEmailFormProps {
  value?: string;
}

useEmailForm.defaultProps = {
  value: "",
};

export default function useEmailForm(defaultValue?: string) {
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
      (state) =>
        (state = REGEX.EMAIL.test(value) && !REGEX.TRAILING_SLASH.test(value))
    );
  }, [value]);
  return {
    value,
    validation,
    onChange,
  };
}
