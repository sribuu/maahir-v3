import * as React from "react";
import clsx from "clsx";
import ModalComponent, {
  IModalComponentProps,
} from "@/src/core/ui/components/modal/Modal.component";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import useOpenModalComponent from "@/src/core/ui/components/modal/useOpenModal.hook";

export interface IInvalidPasswordModalAuthProps extends IModalComponentProps {}

export default function InvalidPasswordModalAuth(
  props: IInvalidPasswordModalAuthProps
) {
  const { open, setOpen } = useOpenModalComponent({ open: props.open });

  const handleClickTryAgain = () => {
    setOpen(false);
  };
  const handleClickContactUs = () => {
    setOpen(false);
  };
  return (
    <ModalComponent open={open}>
      <CardComponent className={clsx("p-[1.5rem] max-w-[380px]")}>
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[1.5rem] place-content-center place-items-center "
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 gap-y-[0.75rem] place-content-center place-items-center "
            )}
          >
            <p
              className={clsx(
                "text-[1.75rem] text-charleston-green font-bold text-center"
              )}
            >
              {"Login Gagal"}
            </p>
            <p
              className={clsx(
                "text-[1rem] text-independence font-regular text-center"
              )}
            >
              {`Email atau kata sandi salah
                Silakan coba lagi atau hubungi Maahir untuk mendaftarkan akun`}
            </p>
          </div>

          <div
            className={clsx(
              "flex items-center justify-between gap-x-[1.25rem]"
            )}
          >
            <ButtonComponent
              intent={"secondary"}
              className={clsx("w-full")}
              onClick={handleClickTryAgain}
            >
              {"Coba Lagi"}
            </ButtonComponent>
            <ButtonComponent
              intent={"primary"}
              className={clsx("w-full")}
              onClick={handleClickContactUs}
            >
              {"Hubungi Maahir"}
            </ButtonComponent>
          </div>
        </div>
      </CardComponent>
    </ModalComponent>
  );
}
