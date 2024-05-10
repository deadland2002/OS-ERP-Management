"use client";

import React, { useRef } from "react";

interface props {
  onAdd: (file: File) => void;
  file: File | undefined;
  name: string;
}

const FileUpload = (prop: props) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
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
    <div className={`w-full flex flex-col gap-2`}>
      <label
        className={`bg-purple-50 rounded-medium flex justify-center items-center flex-col text-sm text-secondary-500 relative min-h-[100px] border-1 border-purple-300`}
        htmlFor={`${prop.name}_id`}
        onDrop={HandleDropComplete}
        onDragOver={HandleDrop}
        onDragLeave={HandleMouseLeave}
      >
        {prop.file && prop.file.name ? (
          <div ref={dataRef}>
            <span>{prop.file.name}</span>
          </div>
        ) : (
          <div className={`flex flex-col items-center`} ref={dataRef}>
            <span
              className={`text-blue-500 p-2 bg-purple-100 rounded-large flex justify-center items-center`}
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
          onChange={HandleChange}
          name={prop.name}
        />
        <div
          ref={infoRef}
          className={`text-large justify-center items-center hidden rounded-large pointer-events-none`}
        ></div>
      </label>
    </div>
  );
};

export default FileUpload;
