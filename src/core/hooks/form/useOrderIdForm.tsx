import { useEffect, useState } from "react";

export interface IuseOrderIdFormProps {
  value?: string;
}

useOrderIdForm.defaultProps = {
  value: "",
};

export default function useOrderIdForm(props: IuseOrderIdFormProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.value !== undefined) {
      setValue((state) => (state = props.value));
    }
  }, [props.value]);
  const onChange = (name: string) => {
    setValue((state) => (state = name));
  };
  return {
    value,
    onChange,
  };
}
