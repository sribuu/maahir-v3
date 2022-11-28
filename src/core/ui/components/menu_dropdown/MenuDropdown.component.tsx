import { useState, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";

export interface IMenuDropdownComponentProps {}

export default function MenuDropdownComponent(
  props: IMenuDropdownComponentProps
) {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((open) => (open = !open));
  };

  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((open) => (open = !open));
  };
  useOnClickOutside(ref, () => setOpen(false));
  const list = [
    {
      name: "Kelola Profil",
      icon: "/icons/manage-profile.svg",
      link: "/supplier/kelola-profil",
    },
    {
      name: "Keluar",
      icon: "/icons/logout.svg",
      link: "/login",
    },
  ];
  return (
    <div
      ref={ref}
      className={clsx("relative", "grid grid-cols-1", "gap-y-[0.75rem]")}
    >
      <button
        className={clsx("flex justify-end items-center gap-x-[0.5rem]")}
        onClick={handleClick}
      >
        <div
          className={clsx(
            "flex justify-center items-center",
            "w-[40px] h-[40px] rounded-[50%]",
            "bg-mauve",
            "box-border"
          )}
        >
          <p className={clsx("text-[1.5rem] text-bold text-white")}>{"P"}</p>
        </div>

        <img src={"/icons/chevron-down-black.svg"} width={20} height={20} />
      </button>

      {open && (
        <div
          className={clsx(
            "absolute",
            "top-[3rem] right-[0rem] z-10 rounded-[0.625rem]",
            "bg-white",
            "shadow-3",
            "min-w-[164px] p-[1.5rem]",
            "grid grid-cols-1 gap-y-[1.5rem] items-center content-center justify-start justify-items-start"
          )}
        >
          {list.map((item, index) => (
            <Link href={item.link} key={index}>
              <button
                id={item.name}
                className={clsx(
                  "flex content-start items-center gap-x-[0.5rem]",
                  "w-full min-w-[150px]",
                  "bg-white",
                  "rounded-[0.625rem] max-h-[3.5rem]"
                )}
                onClick={handleClickOption}
              >
                <img src={item.icon} />
                <p
                  className={clsx(
                    "text-[1rem] font-regular",
                    item.name === "Kelola Profil"
                      ? "text-charleston-green"
                      : "text-tart-orange"
                  )}
                >
                  {item.name}
                </p>
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
