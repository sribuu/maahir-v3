import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";

export interface AutocompleteFunctionProps {
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onSelect?: (value: string) => void;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClear?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface AutocompleteDataProps {
  // required
  options: string[];
  // not required

  value?: string;
  id?: string;
  defaultValue?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  selected?: string;
  open?: boolean;
  noOptionsText?: string;
}

export interface AutocompleteDropdownDataJSON {
  // required
  options: string[];
  // not required
  value?: string;
  id?: string;
  default_value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  selected?: string;
  no_options_text?: string;
}
export interface IAutocompleteComponentProps
  extends AutocompleteDataProps,
    AutocompleteFunctionProps {}

AutocompleteComponent.defaultProps = {
  value: "",
  placeholder: "",
  id: "",
  defaultValue: "",
  label: "halllo",
  disabled: false,
  options: [],
  selected: "",
  noOptionsText: "",
};

export default function AutocompleteComponent(
  props: IAutocompleteComponentProps
) {
  const ref = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    open: false,
    value: props.selected,
    selected: "",
    options: props.options,
  });

  useEffect(() => {
    setState({ ...state, options: props.options });
  }, [props.options]);

  useOnClickOutside(ref, () => setState({ ...state, open: false }));

  const handleClickSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState({
      ...state,
      open: false,
      selected: e.currentTarget.value,
      value: e.currentTarget.value,
    });
    if (props.onSelect) {
      props.onSelect(e);
    }
  };
  const handleFocusTextfield = (e: React.FocusEvent<HTMLInputElement>) => {
    setState({ ...state, open: true });
    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  const handleBlurTextfield = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  const handleChangeTextfield = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    setState({
      ...state,
      value: newValue,
      options: props.options.filter((item) =>
        item.toLowerCase().includes(newValue.toLowerCase())
      ),
    });
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleClearTextfield = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState({ ...state, value: "", selected: "", options: props.options });

    if (props.onClear) {
      props.onClear(e);
    }
  };

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.disabled) {
      setState({ ...state, open: !state.open });
    }
  };

  useEffect(() => {
    if (props.selected?.length > 0) {
      setState({ ...state, selected: props.selected });
    }
  }, [props.selected]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1",
        "gap-y-[0.25rem]",
        "w-full",
        "relative"
      )}
    >
      <label
        className={clsx(
          "text-[0.875rem] font-regular",
          !props.disabled ? "text-charleston-green" : "text-taupe-gray"
        )}
        htmlFor={props.id}
      >
        {props.label}
      </label>

      <div className={clsx("grid grid-cols-1", "w-full", "relative")} ref={ref}>
        <div
          className={clsx(
            "flex justify-between gap-4",
            "w-full p-4 h-[3.5rem]",
            "rounded-[0.625rem]",
            "box-border",
            !props.disabled ? "bg-white" : "bg-bright-gray",
            "border border-gainsboro"
          )}
        >
          <input
            className={clsx(
              "w-full",
              !props.disabled ? "bg-white bg-opacity-0" : "bg-bright-gray",
              "outline-0",
              "placeholder:text-taupe-gray placeholder:font-regular placeholder:text-[1rem]"
            )}
            placeholder={props.placeholder}
            onFocus={handleFocusTextfield}
            onBlur={handleBlurTextfield}
            onChange={handleChangeTextfield}
            disabled={props.disabled}
            value={state.open ? state.value : state.selected}
          />

          {/* end addornment */}
          <div
            className={clsx(
              "flex items-center justify-end",
              !String(state.selected).length
                ? "gap-x-[0.25rem]"
                : "gap-x-[0rem]"
            )}
          >
            {String(state.selected).length !== 0 && (
              <button onClick={handleClearTextfield}>
                <img
                  src={"/icons/close-gray.svg"}
                  className={clsx("w-6 h-6")}
                />
              </button>
            )}
            <button onClick={handleClickOpen}>
              <img
                src={"/icons/chevron-down.svg"}
                className={clsx(state.open ? "rotate-180" : "rotate-0")}
              />
            </button>
          </div>
        </div>

        {/* when options is empty array */}
        {state.open && state.options.length !== 0 && (
          <div
            className={clsx(
              "grid grid-cols-1",
              "w-full rounded-[6px] max-h-[352px] p-[1rem]",
              "border border-gainsboro",
              "overflow-scroll",
              "absolute top-[62px] z-10",
              "bg-white shadow-4"
            )}
          >
            {state.options.map((item: string, index: number) => {
              return (
                <button
                  key={index}
                  id={String(index)}
                  value={item}
                  className={clsx(
                    "grid grid-cols-1 justify-start justify-items-start",
                    "w-full p-[1rem]",
                    "border-b border-b-bright-gray"
                  )}
                  onClick={handleClickSelect}
                >
                  <p
                    className={clsx(
                      "text-[0.875rem] text-independence font-regular"
                    )}
                  >
                    {item}
                  </p>
                </button>
              );
            })}
          </div>
        )}
        {/* when options is not empty array */}
        {state.open && !state.options.length && (
          <div
            className={clsx(
              "grid grid-cols-1",
              "w-full rounded-[6px] max-h-[200px]",
              "border border-gainsboro",
              "overflow-scroll",
              "absolute top-[62px] z-10",
              "bg-white"
            )}
          >
            <button
              id={`no-options`}
              className={clsx(
                "grid grid-cols-1 justify-start justify-items-start",
                "w-full p-[1rem]",
                "border-b border-b-bright-gray",
                "cursor-default"
              )}
            >
              <p
                className={clsx(
                  "text-[0.875rem] text-independence font-regular"
                )}
              >
                {"Tidak ada pilihan"}
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
