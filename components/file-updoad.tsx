"use client";

import { UploadDropzone } from "@uploadthing/react";
import toast from "react-hot-toast";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter; // "courseImage" | "courseAttachment" | "chapterVideo"
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={(res: { url: string }[]) => {
        if (res?.[0]?.url) onChange(res[0].url);
        else toast.error("No file returned");
      }}
      onUploadError={(err: Error) => {
        toast.error(err.message);
      }}
    />
  );
};
