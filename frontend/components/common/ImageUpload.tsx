"use client";

import React, {useEffect, useRef, useState} from "react";

interface props {
  onAdd: (file: File) => void;
  file: File | null;
  title?: string;
  isRequired?: boolean;
  name: string;
}

const ImageUpload = (prop: props) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string|ArrayBuffer|null>(null);

  useEffect(() => {
    var reader  = new FileReader();

    reader.onloadend = function () {
      setImageUrl(reader.result)
    }

    if (prop.file) {
      reader.readAsDataURL(prop.file);
    }
  }, [prop.file]);

  const HandleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const div = e.target as HTMLDivElement;
    const data = div.children[0] as HTMLDivElement;

    if (infoRef.current && dataRef.current) {
      infoRef.current.style.display = "flex";
      dataRef.current.style.display = "none";
      infoRef.current.innerHTML = `
            <span>
            Drop file to attach
            </span>
        `;
    }

    console.log("hover");
  };

  const HandleDropComplete = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    HandleMouseLeave();

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            prop.onAdd(file);
          }
        }
      });
    }
  };

  const HandleMouseLeave = () => {
    console.log("leave");
    if (infoRef.current && dataRef.current) {
      infoRef.current.style.display = "none";
      dataRef.current.style.display = "flex";
    }
  };

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      prop.onAdd(input.files[0]);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-2 flex-1 h-full`}>
      <label
        className={`bg-purple-50 flex-1 p-2 flex justify-center items-center flex-col text-sm text-secondary-500 relative min-h-[100px] border-1 border-purple-300`}
        htmlFor={`${prop.name}_id`}
        onDrop={HandleDropComplete}
        onDragOver={HandleDrop}
        onDragLeave={HandleMouseLeave}
      >
        {prop.file && prop.file.name ? (
          <img src={imageUrl?.toString()} className={`flex w-full h-full object-contain`} />
        ) : (
          <div
            className={`flex flex-col items-center text-center`}
            ref={dataRef}
          >
            <span
              className={`text-blue-500 w-10 h-10 bg-purple-100 rounded flex justify-center items-center`}
            >
              <i className="fi fi-rr-cloud-upload-alt"></i>
            </span>
            <span>
              <span className={`text-blue-500`}>Click to Upload</span> or drag
              and drop
            </span>
          </div>
        )}
        <input
          className={`invisible absolute`}
          type={"file"}
          id={`${prop.name}_id`}
          required={prop.isRequired}
          onChange={HandleChange}
          name={prop.name}
          accept={"image/jpeg"}
        />
        <div
          ref={infoRef}
          className={`text-large justify-center items-center hidden rounded-large pointer-events-none`}
        ></div>
      </label>
    </div>
  );
};

export default ImageUpload;
