import * as React from "react";
import clsx from "clsx";

export interface INotesInputComponentProps
  extends React.HTMLAttributes<HTMLInputElement> {}

export default function NotesInputComponent(props: INotesInputComponentProps) {
  const { className, ...restProps } = props;
  return (
    <div
      className={clsx(
        "flex justify-start",
        "w-full py-[0.375rem] px-[0.875rem]",
        "rounded-[0.5rem]",
        "border border-gainsboro "
      )}
    >
      <input
        className={clsx(
          "w-full",
          "bg-white bg-opacity-0 outline-0",
          "text-charleston-green font-regular text-[0.75rem]",
          "placeholder:text-taupe-gray placeholder:font-regular placeholder:text-[0.75rem]",
          className
        )}
        {...restProps}
      />
    </div>
  );
}
