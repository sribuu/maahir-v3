import * as React from "react";
import clsx from "clsx";

export interface ISearchInputComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onSearch?: () => void;
}
SearchInputComponent.defaultProps = {
  label: "",
};
export default function SearchInputComponent(
  props: ISearchInputComponentProps
) {
  const { className, ...restProps } = props;
  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSearch) {
      props.onSearch();
    }
  };
  return (
    <div
      className={clsx(
        "flex justify-between",
        "w-full px-[1rem] py-[0.5rem]",
        "gap-4",
        "border border-gainsboro rounded-[0.625rem]"
      )}
    >
      <input
        className={clsx(
          //   "w-full",
          "bg-white bg-opacity-0 outline-0",
          "placeholder:text-taupe-gray placeholder:font-regular placeholder:text-[1rem]",
          className
        )}
        {...restProps}
      />
      <button
        className={clsx(
          "grid place-content-center place-items-center",
          "w-[1.5rem] h-[1.5rem] rounded-[0.375rem]",
          "bg-ocean-boat-blue"
        )}
        onClick={handleSearch}
      >
        <img src={"/icons/search.svg"} className={clsx("w-[1rem] h-[1rem]")} />
      </button>
    </div>
  );
}
