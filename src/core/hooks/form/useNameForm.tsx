import { useEffect, useState } from "react";
import { REGEX } from "../../lib/constants/regex";

export interface IuseNameFormProps {
  value?: string;
}

useNameForm.defaultProps = {
  value: "",
};

export default function useNameForm(defaultValue?: string) {
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue((state) => (state = defaultValue));
    }
  }, [defaultValue]);

  const onChange = (data: string) => {
    setValue((state) => (state = data));
  };

  //   validation criteria
  useEffect(() => {
    setValidation(
      (state) =>
        (state = REGEX.NAME.test(value) && !REGEX.TRAILING_SLASH.test(value))
    );
  }, [value]);
  return {
    value,
    validation,
    onChange,
  };
}
