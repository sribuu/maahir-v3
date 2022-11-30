import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export interface IImageUploadComponentProps {
  onError?: (data: { message: string }) => void;
}

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return false;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return sizes[i] === "MB" &&
    parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) <= 10
    ? true
    : sizes[i] === "KB"
    ? true
    : sizes[i] === "Bytes"
    ? true
    : false;
};

const isImage = (data: File[]) => {
  return data.map((item) => item.type.includes("image")).includes(false)
    ? false
    : true;
};

const isExceedsMaxNumberUpload = (data: File[]) => data.length > 10;

const isSizeMeetCriteria = (data: File[]) => {
  const size = data.reduce((acc, item) => acc + parseInt(String(item.size)), 0);
  return formatBytes(size);
};

export const processMultipleImagesData = (files: FileList) => {
  let tempImage: File[] = [];
  for (let i = 0; i < files.length; i++) {
    tempImage = [...tempImage, files[i]];
  }
  return tempImage;
};

export default function ImageUploadComponent(
  props: IImageUploadComponentProps
) {
  const { onError } = props;
  const [viewUploadArea, setViewUploadArea] = useState<boolean>(true);
  // temp image : for validation before it was uploaded
  const [tempImageFiles, setTempImageFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const tempImage = processMultipleImagesData(e.target.files);
    setTempImageFiles([...imageFiles, ...tempImage]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tempImage = processMultipleImagesData(e.dataTransfer.files);
    setTempImageFiles([...imageFiles, ...tempImage]);
  };

  const handleClickUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current.click();
  };

  useEffect(() => {
    const images: string[] = [];
    const fileReaders: FileReader[] = [];
    let isCancel = false;
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result as string);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  // hide and display upload area
  useEffect(() => {
    if (images.length >= 10) {
      setViewUploadArea(false);
    } else {
      setViewUploadArea(true);
    }
  }, [images]);

  // validate all images
  useEffect(() => {
    if (tempImageFiles.length > 0) {
      if (!isImage(tempImageFiles)) {
        onError({ message: "Only accept image format" });
      } else if (isExceedsMaxNumberUpload(tempImageFiles)) {
        onError({ message: "Images exceeds limit" });
      } else if (!isSizeMeetCriteria(tempImageFiles)) {
        onError({ message: "File size exceeds limit" });
      } else {
        setImageFiles([...imageFiles, ...tempImageFiles]);
      }
    }
  }, [tempImageFiles]);

  return (
    <div className={clsx("grid grid-cols-1 gap-y-[1.5rem]", "w-full")}>
      <div className={clsx("grid grid-cols-1 gap-y-[0.5rem]", "w-full")}>
        <label
          htmlFor={"inputFile"}
          className={clsx(
            "text-[0.875rem] font-regular",
            "text-charleston-green"
          )}
        >
          {"Foto Produk"}
        </label>

        <div
          className={clsx(
            "relative",
            "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
            "border border-dashed border-gainsboro",
            "rounded-[0.5rem] p-[1.75rem] w-full",
            viewUploadArea ? "block" : "hidden"
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* overlay button */}
          <button
            className={clsx(
              "absolute",
              "top-0 left-0 right-0 bottom-0",
              "bg-white opacity-0",
              "z-10"
            )}
            onClick={handleClickUpload}
          />

          <input
            ref={inputRef}
            type="file"
            id="`inputFile`"
            className={clsx("sr-only")}
            multiple={true}
            accept={"image/png, image/gif, image/jpeg"}
            onChange={handleChangeUpload}
          />
          <img src={"/illustrations/image-upload.svg"} />
          <p
            className={clsx(
              "text-charleston-green",
              "text-[1rem] font-regular text-center"
            )}
          >
            {"Jatuhkan gambar Anda dan "}

            <span
              className={clsx(
                "text-ocean-boat-blue",
                "text-[1rem] font-regular text-center"
              )}
            >
              {"klik untuk menjelajah"}
            </span>
          </p>

          <div>
            <p
              className={clsx(
                "text-taupe-gray",
                "text-[0.75rem] font-regular text-center"
              )}
            >
              {`Masukkan foto produkmu, maksimal 10 foto, minimal 1 foto.`}
            </p>
            <p
              className={clsx(
                "text-taupe-gray",
                "text-[0.75rem] font-regular text-center"
              )}
            >
              {`Pastikan resolusi di atas 300x300px.`}
            </p>
          </div>

          <p
            className={clsx(
              "text-taupe-gray",
              "text-[0.75rem] font-regular text-center"
            )}
          >
            {"Urutan upload mempengaruhi urutan foto yang ditampilkan"}
          </p>
        </div>
      </div>

      {/* collection */}
      <div className={clsx("grid grid-cols-4 gap-x-[1.5rem] gap-y-[1.5rem]")}>
        {images.length > 0 &&
          images.map((item, index) => (
            <img
              key={index}
              src={item}
              className={clsx("w-[106px] h-[106px] rounded-[0.5rem]")}
            />
          ))}
      </div>
    </div>
  );
}
