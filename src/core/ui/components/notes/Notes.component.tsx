import React, { useEffect, useState } from "react";
import clsx from "clsx";
import NotesInputComponent from "../notes_input/NotesInput.component";

export interface INotesComponentProps
  extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  value?: string;
  onSave?: (data: { id: string; value: string }) => void;
}
NotesComponent.defaultProps = {
  value: "",
};

export default function NotesComponent(props: INotesComponentProps) {
  const [saveValue, setSaveValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [inputNote, setInputNote] = useState(false);
  const handleClickWriteNote = () => {
    setInputNote(true);
  };

  useEffect(() => {
    if (props.onSave && saveValue.length > 0) {
      props.onSave({ id: props.id, value: saveValue });
    }
  }, [saveValue]);

  useEffect(() => {
    if (props.value?.length > 0) {
      setSaveValue(props.value);
    }
  }, [props.value]);

  if (!saveValue.length && !inputNote) {
    return (
      <button className={clsx("w-fit")} onClick={handleClickWriteNote}>
        <p className={clsx("text-[0.75rem] text-ocean-boat-blue font-medium")}>
          {"Tulis catatan"}
        </p>
      </button>
    );
  }
  const handleClickChangeNote = () => {
    setInputNote(true);
  };
  if (saveValue.length > 0 && !inputNote) {
    return (
      <div className={clsx("flex items-center justify-start gap-x-[0.75rem]")}>
        <p className={clsx("text-[0.75rem] text-taupe-gray font-regular")}>
          {saveValue.length > 30 ? `${saveValue.slice(0, 30)} ...` : saveValue}
        </p>
        <button className={clsx("w-fit")} onClick={handleClickChangeNote}>
          <p
            className={clsx("text-[0.75rem] text-ocean-boat-blue font-medium")}
          >
            {"Ubah"}
          </p>
        </button>
      </div>
    );
  }

  const handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (changeValue.length > 0) {
      setSaveValue(changeValue);
    } else {
      setSaveValue(changeValue);
    }
    setInputNote(false);
  };

  const handleKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSaveValue(changeValue);
      setInputNote(false);
    }
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeValue(e.currentTarget.value);
  };

  return (
    <NotesInputComponent
      id={props.id}
      placeholder={"Tulis Catatan Disini"}
      value={changeValue}
      onKeyUp={handleKeyUpInput}
      onChange={handleChangeInput}
      onBlur={handleBlurInput}
    />
  );
}
