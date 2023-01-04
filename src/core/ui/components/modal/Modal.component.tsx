import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import BackdropComponent from "../backdrop/Backdrop.component";

export interface IModalComponentProps {
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}
ModalComponent.defaultProps = {
  open: false,
};

export default function ModalComponent(props: IModalComponentProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  return (
    <>
      {open && (
        <BackdropComponent>
          <div
            ref={ref}
            className={clsx(
              "grid place-content-center place-items-center",
              "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50"
            )}
          >
            {props.children}
          </div>
        </BackdropComponent>
      )}
    </>
  );
}
