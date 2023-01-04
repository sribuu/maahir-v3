import { useEffect, useState } from "react";

export interface IuseOrderIdFormProps {
  value?: string;
}

useOrderIdForm.defaultProps = {
  value: "",
};

export default function useOrderIdForm(defaultValue?: string) {
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
    setValidation((state) => (state = value.length > 0));
  }, [value]);
  return {
    value,
    validation,
    onChange,
  };
}
