import { useEffect, useState } from "react";

export interface IuseNameFormProps {
  name?: string;
}

useNameForm.defaultProps = {
  name: "",
};

export default function useNameForm(props: IuseNameFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.name !== undefined) {
      setName((state) => (state = props.name));
    }
  }, [props.name]);
  const onChangeName = (name: string) => {
    setName((state) => (state = props.name));
  };
  return {
    name,
    onChangeName,
  };
}
