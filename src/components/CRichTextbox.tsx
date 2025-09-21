import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    // Header and font controls
    [{ header: "1" }, { header: "2" }, { font: [] }],
    // Text formatting
    ["bold", "italic", "underline", "strike", "blockquote"],
    // Lists and indentation
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // Text alignment
    [{ align: [] }],
    // Font size
    [{ size: ["small", false, "large", "huge"] }],
    // Text and background colors
    [{ color: [] }, { background: [] }],
    // Links, images, and videos
    ["link", "image", "video"],
    // "Clean" button to remove all formatting
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align", // New format
  "color", // New format
  "background", // New format
];

function CRichTextbox({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
}

export default CRichTextbox;
