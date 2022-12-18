import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import TrashIcon from "../../icons/trash/Trash.icon";

export interface IImageUploadComponentProps {
  images?: { base64: string; file_format: string }[];
  onSetCoverImage?: (data: number) => void;
  onChange?: (data: { base64: string; file_format: string }[]) => void;
  onError?: (data: { message: string }) => void;
}

ImageUploadComponent.defaultProps = {
  images: [],
};

export function dataURLtoFile(dataurl, filename, format) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: `image/${format}` });
}

const toDataURL = (url) =>
  fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .catch((e) => {
      throw e;
    });

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

  // image url
  const [tempPropsImageFiles, setTempPropsImageFiles] = useState<File[]>([]);

  // temp image : for validation before it was uploaded
  const [tempImageFiles, setTempImageFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<
    { base64: string; file_format: string }[]
  >([]);

  // images collection
  const [hoveredImage, setHoveredImage] = useState<number>(-1);
  const [coverImage, setCoverImage] = useState<number>(0);

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
    const newImages: { base64: string; file_format: string }[] = [];
    const fileReaders: FileReader[] = [];
    let isCancel = false;
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            // images.push(result as string);
            newImages.push({
              base64: result as string,
              file_format: file.type,
            });
          }
          if (newImages.length === imageFiles.length && !isCancel) {
            setImages(newImages);
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

  //  props.onchange
  useEffect(() => {
    if (images.length <= 10 && props.onChange) {
      const result = images;
      props.onChange(result);
    }
  }, [images]);

  //  props.onSetCover
  useEffect(() => {
    if (props.onSetCoverImage) {
      props.onSetCoverImage(coverImage);
    }
  }, [coverImage]);

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
        setImageFiles(tempImageFiles);
      }
    }
  }, [tempImageFiles]);

  // props images
  useEffect(() => {
    if (tempPropsImageFiles.length > 0) {
      if (!isImage(tempPropsImageFiles)) {
        onError({ message: "Only accept image format" });
      } else if (isExceedsMaxNumberUpload(tempPropsImageFiles)) {
        onError({ message: "Images exceeds limit" });
      } else if (!isSizeMeetCriteria(tempPropsImageFiles)) {
        onError({ message: "File size exceeds limit" });
      } else {
        setImageFiles(tempPropsImageFiles);
      }
    }
  }, [tempPropsImageFiles]);

  // images collection
  const handleMouseEnterImagesCollection = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredImage(parseInt(e.currentTarget.id));
  };
  const handleMouseLeaveImagesCollection = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredImage(-1);
  };
  const handleSelectCoverImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCoverImage(parseInt(e.currentTarget.id));
  };

  const handleClickDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newImages = images.filter(
      (_, id) => id !== parseInt(e.currentTarget.id)
    );
    const newImageFiles = imageFiles.filter(
      (_, id) => id !== parseInt(e.currentTarget.id)
    );
    setImages(newImages);
    setImageFiles(newImageFiles);
  };

  // transform props
  useEffect(() => {
    if (
      props?.images &&
      props.images?.length > 0 &&
      props.images.length !== images.length
    ) {
      let rewriteImagePropsToImage: { base64: string; file_format: string }[] =
        [];
      let rewriteImagePropsToTempImageFile: File[] = [];

      for (let i = 0; i < props.images?.length; i++) {
        toDataURL(
          props.images[i].base64.replaceAll(
            "https://sribuu-jkt-public-staging.s3.ap-southeast-3.amazonaws.com/",
            "/cdn/images/"
          )
        ).then((dataUrl) => {
          rewriteImagePropsToImage = [
            ...rewriteImagePropsToImage,
            {
              base64: dataUrl as string,
              file_format: props.images[i].base64.slice(
                props.images[i].base64.lastIndexOf(".") + 1
              ),
            },
          ];

          rewriteImagePropsToTempImageFile = [
            ...rewriteImagePropsToTempImageFile,
            dataURLtoFile(
              dataUrl,
              props.images[i].base64,
              props.images[i].base64.slice(
                props.images[i].base64.lastIndexOf(".") + 1
              )
            ),
          ];

          setTempPropsImageFiles(rewriteImagePropsToTempImageFile);
        });
      }
    }
  }, [props.images]);

  console.log(imageFiles, "ini image files");
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
            <div
              key={index}
              id={String(index)}
              className={clsx("relative")}
              onMouseEnter={handleMouseEnterImagesCollection}
              onMouseLeave={handleMouseLeaveImagesCollection}
            >
              <div
                className={clsx(
                  "absolute top-[0.375rem] left-[0.375rem] translate-x-[0.375rem] translate-y-[0.375rem]",
                  "rounded-[0.25rem]",
                  "px-[0.125rem] py-[0.25rem]",
                  "bg-black opacity-30",
                  "flex items-center justify-center",
                  coverImage === index && hoveredImage !== index
                    ? "block"
                    : "hidden"
                )}
              >
                <p className={clsx("text-[7px] font-medium text-white")}>
                  {"Gambar Cover"}
                </p>
              </div>

              {/* trash icon */}
              <button
                id={String(index)}
                className={clsx(
                  "absolute top-[0.375rem] right-[0.375rem]",
                  "p-[0.125rem]",
                  "flex items-center justify-center",
                  "z-20",
                  "rounded-[0.25rem]",
                  "bg-black",
                  hoveredImage === index ? "opacity-30" : "opacity-0"
                )}
                onClick={handleClickDeleteImage}
              >
                <TrashIcon
                  className={clsx("w-[0.875rem] h-[0.875rem] fill-white")}
                />
              </button>

              <img
                src={item.base64}
                className={clsx("w-[106px] h-[106px] rounded-[0.5rem]")}
              />
              {/* filter */}
              <div
                className={clsx(
                  "absolute top-0 left-0 right-0 bottom-0",
                  "z-10",
                  "rounded-[0.5rem]",
                  "bg-black",
                  hoveredImage === index ? "opacity-30" : "opacity-0"
                )}
              />

              <button
                id={String(index)}
                className={clsx(
                  "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
                  "z-20",
                  "flex items-center justify-center",
                  "py-[0.125rem] px-[0.5rem] rounded-[0.25rem]",
                  "bg-ocean-boat-blue",
                  "w-[84px] h-[20px]",
                  hoveredImage === index ? "block" : "hidden"
                )}
                onClick={handleSelectCoverImage}
              >
                <p className={clsx("text-[0.625rem] text-white font-medium")}>
                  {"Jadikan Cover"}
                </p>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
