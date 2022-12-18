import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import CloseIcon from "../../icons/close/Close.icon";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";

export interface IToastComponentProps {
  open?: boolean;
  error?: boolean;
  message?: string;
  onClose?: () => void;
}

ToastComponent.defaultProps = {
  open: false,
  variant: "success",
  message: "",
  error: false,
};

export default function ToastComponent(props: IToastComponentProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const delay = 3;
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useOnClickOutside(ref, () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  });

  useEffect(() => {
    if (open) {
      let timer1 = setTimeout(() => setOpen(false), delay * 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className={clsx(
        "flex justify-center items-center gap-[1.5rem]",
        "p-[0.75rem] rounded-[0.75rem]",
        !props.error ? "bg-caribbean-green" : "bg-tart-orange",
        !props.error ? "shadow-toast-success" : "shadow-toast-error",
        "fixed top-[74px] left-[50%] translate-x-[-50%]",
        open ? "block" : "hidden"
      )}
    >
      <p className={clsx("text-[0.875rem] text-white font-regular")}>
        {props.message}
      </p>

      <button onClick={handleClose}>
        <CloseIcon className={clsx("w-[1.25rem] h-[1.25rem] fill-white")} />
      </button>
    </div>
  );
}
