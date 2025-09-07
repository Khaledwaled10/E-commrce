import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#0aad0a" size={50} />
    </div>
  );
}
