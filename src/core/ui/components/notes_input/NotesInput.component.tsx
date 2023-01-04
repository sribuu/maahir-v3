import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export interface INotesInputComponentProps
  extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  open?: boolean;
}

export default function NotesInputComponent(props: INotesInputComponentProps) {
  const { className, value, ...restProps } = props;

  return (
    <div
      className={clsx(
        "flex justify-start items-center gap-x-[0.5rem]",
        "w-full py-[0.375rem] px-[0.875rem]",
        "rounded-[0.5rem]",
        "border border-ocean-boat-blue"
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
        maxLength={144}
        autoFocus={true}
        value={value}
        {...restProps}
      />
      <p className={clsx("text-[0.625rem] text-regular text-taupe-gray")}>
        {`${value.length}/144`}
      </p>
    </div>
  );
}
