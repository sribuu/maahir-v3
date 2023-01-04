import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";
import { useState, useRef, useEffect } from "react";

export interface IuseOpenModalComponentProps {
  open?: boolean;
}

useOpenModalComponent.defaultProps = {
  open: false,
};

export default function useOpenModalComponent(
  props: IuseOpenModalComponentProps
) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return {
    open,
    setOpen,
  };
}
