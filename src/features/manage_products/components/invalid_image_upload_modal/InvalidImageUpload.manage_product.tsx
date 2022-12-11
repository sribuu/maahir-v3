import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import ModalComponent, {
  IModalComponentProps,
} from "@/src/core/ui/components/modal/Modal.component";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import useOpenModalComponent from "@/src/core/ui/components/modal/useOpenModal.hook";
import { ExternalLink } from "@/src/core/lib/constants";
export interface IInvalidImageUploadlModalManageProductProps
  extends IModalComponentProps {}

export default function InvalidImageUploadlModalManageProduct(
  props: IInvalidImageUploadlModalManageProductProps
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
              {"Email belum terdaftar"}
            </p>
            <p
              className={clsx(
                "text-[1rem] text-independence font-regular text-center"
              )}
            >
              {"Silakan hubungi Maahir untuk mendaftarkan email ini "}
              <span
                className={clsx(
                  "text-[1rem] text-independence font-bold text-center"
                )}
              >
                {"ninanursita@website.com"}
              </span>
            </p>
          </div>

          <div
            className={clsx(
              "grid grid-cols-2 justify-between justify-items-start items-center content-center gap-x-[1.25rem]",
              "w-full"
            )}
          >
            <ButtonComponent
              intent={"secondary"}
              className={clsx("w-full")}
              onClick={handleClickTryAgain}
            >
              {"Coba Lagi"}
            </ButtonComponent>
            <Link href={ExternalLink.WhatsApp} target={"_blank"}>
              <ButtonComponent
                intent={"primary"}
                className={clsx("w-full")}
                onClick={handleClickContactUs}
              >
                {"Hubungi Maahir"}
              </ButtonComponent>
            </Link>
          </div>
        </div>
      </CardComponent>
    </ModalComponent>
  );
}
